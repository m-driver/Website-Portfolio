

let currentScale = 0;
let currentSoundholder = 1;
let headerHeight = 110;
let footerHeight = 15;

// Order: [0][1-6] C Major, [1][0-5] G Major, [2][0-5] A Minor,
const scales = [
  ["sounds/piano-c.mp3", "sounds/piano-d.mp3", "sounds/piano-e.mp3",
  "sounds/piano-f.mp3", "sounds/piano-g.mp3", "sounds/piano-a.mp3", "sounds/piano-b.mp3"],
  ["sounds/piano-g.mp3", "sounds/piano-a.mp3", "sounds/piano-b.mp3",
  "sounds/piano-c.mp3", "sounds/piano-d.mp3", "sounds/piano-e.mp3", "sounds/piano-fsharp.mp3"],
  ["sounds/piano-a.mp3", "sounds/piano-b.mp3", "sounds/piano-c.mp3",
  "sounds/piano-d.mp3", "sounds/piano-e.mp3", "sounds/piano-f.mp3", "sounds/piano-g.mp3"],
  ["sounds/piano-e.mp3", "sounds/piano-g.mp3","sounds/piano-fsharp.mp3",
  "sounds/piano-a.mp3", "sounds/piano-b.mp3", "sounds/piano-c.mp3", "sounds/piano-d.mp3"]
];


function randNum (upper, lower) {
  return Math.floor(Math.random() * upper) + lower;
}

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mainSidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mainSidenav").style.width = "0";
}


//Draws between 100-250 circles or random size and color on the screen.
function drawCircles() {
  let numberOfCircles = randNum(250, 100);
  let htmlString = "";
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;
  if (viewportWidth >= 660) {
    headerHeight = 80;
  } else {
    headerHeight = 110;
  }

  //Loop through the number of circle, assign color and size and write it to html
  for (i = numberOfCircles; i > 0; i--) {
    let baseRadius = randNum(40, 1);
    let svgSize = (baseRadius * 2) + 2;
    let halfSVG = svgSize / 2;
    let circleX = randNum(viewportWidth, 0);
    let bottomPadding = viewportHeight - footerHeight - 2;
    let circleY;
    const red = randNum(255, 1);
    const green = randNum(255, 1);
    const blue = randNum(255, 1);

    //Make sure that the Y coordinate stays in bounds.
    do {
    circleY = randNum(bottomPadding, headerHeight);
  } while ((svgSize  + circleY + 2 ) >= bottomPadding);

    // Reset the x coordinate if it is out of bounds.
    if ( (svgSize + circleX) >= viewportWidth + 2) {
      circleX = viewportWidth - svgSize;
    }

    //Add the html for the SVG circle to an html string.
    htmlString += `<span class="circle-container" style="position: absolute;
    top:${circleY}px; height:${svgSize}px; left:${circleX}px; z-index:-1"> <svg height="${svgSize-2}px"
    width="${svgSize - 2}px" style="background-color:transparent"> <circle
    class="circle" cx=${halfSVG } cy=${halfSVG} r=${baseRadius - 2}px stroke="black"
    stroke-width="1" fill="rgb(${red},${green},${blue})" ontouchstart="changeColor(this)"
    onclick="playSound()" onmouseover="changeColor(this)"></circle></svg></span>`;
  }

  //Add all of the created cirlces to the page.
  document.querySelector(".circle-holder").innerHTML = htmlString;

}


// Changes the fill to a random color string.
function changeColor(item) {

  let colorString = `rgb(${randNum(255, 1)},${randNum(255, 1)},${randNum(255, 1)}`;

  item.setAttribute('fill', colorString);

}


//Plays a random sound from the current musical scale.
function playSound() {
  let soundString = `.sound-holder${currentSoundholder}`;
  let noteNumber = randNum(scales[currentScale].length, 0);
  let scaleString = scales[currentScale][noteNumber];
  document.querySelector(soundString).innerHTML = `<audio src="${scaleString}"
    volume="25%" autoplay="true" type="audio/mpeg"></audio>`;

  if( currentSoundholder >= 20 ) {
    currentSoundholder = 1;
  } else {
    currentSoundholder++;
  }
}

//Used to load the sounds without playing them to lessen lag on load of page or new key
function loadSounds() {

  let loadString = "";

  for (i = 0; i < scales[currentScale].length; i++) {
    let tempScaleNum = scales[currentScale][i];
    loadString += `<audio src="${tempScaleNum}" volume="0%" preload="true"
      type="audio/mpeg"></audio>`;
  }

  document.querySelector(".sound-loader").innerHTML = loadString;

}

//Listens for an orientation change and redraws cirlces when it happens.

$( window ).on( "resize", function( event ) {

      //Redraw the circles.
      drawCircles();

});





$('.CMajor').click(function(e){
  if ( currentScale != 0) {
    currentScale = 0;
    loadSounds();
  }
});

$('.GMajor').click(function(e){
  if ( currentScale != 1) {
    currentScale = 1;
    loadSounds();
  }
});

$('.AMinor').click(function(e){
  if ( currentScale != 2) {
    currentScale = 2;
    loadSounds();
  }
});

drawCircles();
loadSounds();
alert("The Circle Chorus is a series of randomly, dynmically generated circle \
SVGs that are assigned a random color upon generation and will change color \
when you mouse over them. If you click a circle, it will also play a note \
in the selected key.")
