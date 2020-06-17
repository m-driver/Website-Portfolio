let liveCells = [];
let currentGrid = [];
let cellArray = [];

const cellStartNum = 60;

let neighbors = 0;
let gridWidth = 30;
let gridHeight = 20;
let gridContainer = new Array();

function lifeStep() {

  let neighborList = new Array();
  let newLiveList = [];
  let counts = { };

  for (let i = 0; i < liveCells.length; i++) { // Check to see which live cells survive

      neighbors = 0;

      let splitCoords = liveCells[i].split(",");
      let splitX = splitCoords[0];
      let splitY = splitCoords[1];
      let xInt = parseInt(splitX);
      let yInt = parseInt(splitY);

      if ( ( yInt - 1 ) >= 0 ) {
        //Check squares above
        neighborList.push(`${xInt},${yInt-1}`);
        if (checkIncludes(`${xInt},${yInt-1}`)) {
          neighbors++;
        }
      }

      if (yInt + 1 <= 19) {
        // Check squares bottom
        neighborList.push(`${xInt},${yInt+1}`);
        if (checkIncludes(`${xInt},${yInt+1}`)) {
          neighbors++;
        }
      }

      if (xInt - 1 >= 0 && yInt > 0 && yInt < 19 ) {
        // Check squares left
        neighborList.push(`${xInt-1},${yInt-1}`);
        if (checkIncludes(`${xInt-1},${yInt-1}`)) {
          neighbors++;
        }
        neighborList.push(`${xInt-1},${yInt}`);
        if (checkIncludes(`${xInt-1},${yInt}`)) {
          neighbors++;
        }
        neighborList.push(`${xInt-1},${yInt+1}`);
        if (checkIncludes(`${xInt-1},${yInt+1}`)) {
          neighbors++;
        }


      } else if (xInt - 1 >= 0 && yInt === 0) {

        neighborList.push(`${xInt-1},${yInt}`);
        if (checkIncludes(`${xInt-1},${yInt}`)) {
          neighbors++;
        }
        neighborList.push(`${xInt-1},${yInt+1}`);
        if (checkIncludes(`${xInt-1},${yInt+1}`)) {
          neighbors++;
        }

      } else if (xInt - 1 >= 0 && yInt === 19) {

        neighborList.push(`${xInt-1},${yInt -1}`);
        if (checkIncludes(`${xInt-1},${yInt-1}`)) {
          neighbors++;
        }
        neighborList.push(`${xInt-1},${yInt}`);
        if (checkIncludes(`${xInt-1},${yInt}`)) {
          neighbors++;
        }
      }

      if (xInt + 1 <= 29 && yInt > 0 && yInt < 19 ) {
        // Check squares right
        neighborList.push(`${xInt+1},${yInt-1}`);
        if (checkIncludes(`${xInt+1},${yInt-1}`)) {
          neighbors++;
        }
        neighborList.push(`${xInt+1},${yInt}`);
        if (checkIncludes(`${xInt+1},${yInt}`)) {
          neighbors++;
        }
        neighborList.push(`${xInt+1},${yInt+1}`);
        if (checkIncludes(`${xInt+1},${yInt+1}`)) {
          neighbors++;
        }


      } else if (xInt + 1 <= 29 && yInt === 0) {

        neighborList.push(`${xInt+1},${yInt}`);
        if (checkIncludes(`${xInt+1},${yInt}`)) {
          neighbors++;
        }
        neighborList.push(`${xInt+1},${yInt+1}`);
        if (checkIncludes(`${xInt+1},${yInt+1}`)) {
          neighbors++;
        }


      } else if (xInt - 1 >= 0 && yInt === 19) {

        neighborList.push(`${xInt+1},${yInt-1}`);
        if (checkIncludes(`${xInt+1},${yInt-1}`)) {
          neighbors++;
        }
        neighborList.push(`${xInt+1},${yInt}`);
        if (checkIncludes(`${xInt+1},${yInt}`)) {
          neighbors++;
        }

      }

      if ( neighbors === 1 || neighbors === 2 ) {
        newLiveList.push(`${xInt},${yInt}`);
      }

    } //End for loop


    let numbersToCount = [];

    //Now determine which dead cells come to life
    for (let i = 0; i < neighborList.length; i++) {
        let num = neighborList[i];

        if ( ! liveCells.includes(neighborList[i])) {
          counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
    }

    for ( let i = 0; i < neighborList.length; i++) {

        if ( !newLiveList.includes(neighborList[i]) && counts[neighborList[i]] === 3 ) {
          newLiveList.push(neighborList[i]);
        }

    }

    liveCells = newLiveList;

    drawGrid (liveCells);
    currentGen++;

    document.getElementById("generation_holder").innerHTML = currentGen;

} // End function


function randNum (upper, lower) {
  return Math.floor(Math.random() * upper) + lower;
}

function setStartCells() {

  let usedCells = [ ];

  for (i = 0; i < cellStartNum; i++) {

    let x = randNum (29, 0);
    let y = randNum (19, 0);
    if (! usedCells.includes(`${x},${y}`) ) {

      usedCells.push(`${x},${y}`);

    }

  }

  liveCells = usedCells;

}

// function clearGrid() {
//
//   let totalSquares = gridWidth*gridHeight;
//   let widthCounter = 0;
//   let heightCounter = 0;
//   let htmlString = "";
//
//   for (i = 0; i < totalSquares; i++) {
//
//       gridContainer[i] = "<div class='dead, cell'></div>";
//       htmlString +=  gridContainer[i];
//   }
//
//   document.querySelector(".container").innerHTML = htmlString;
//
// }

function setCellsLive( cellList ) {

  for (let i = 0; i < cellList.length; i++) {

      let splitCoords = cellList[i].split(",");
      let splitX = parseInt(splitCoords[0]);

      let splitY = parseInt(splitCoords[1]);

      currentGrid[splitX][splitY] = 1;
  }

}

function checkIncludes (Coords) {

  return liveCells.includes(`${Coords}`);

}

function generateNeighbors() {

  for(i = 0; i < neighborList.length; i++) {



  }

}

function setGrid( cellArray ) {

  for (i  = 0; i < cellArray.length; i++) {

    liveCells.push([,])

  }

}


// Function to draw the tables using an array. Makes living cells green, all others white.
function drawGrid ( liveArray ) {
  let currentX = 0;
  let currentY = 0;
  let columns = gridWidth;
  let rows = gridHeight;
  let totalCells = gridWidth * gridHeight;
  let cellPadding = (window.innerWidth - 50 ) / 30;
  let gridHTML = '<table><tr>';
  let counter = 0;
  let cellWidth;

  for ( i = 0; i < totalCells ; i++) {

      let currentCell = `${currentX},${currentY}`;

      if ( liveArray.includes(currentCell) ) {

        gridHTML += `<td class="live" ></td>`;

      } else {

        gridHTML += `<td class="cell" ></td>`;

      }

      counter++;

      if ( counter == gridWidth && i + 1 < totalCells) {

        gridHTML += `</tr><tr>`;
        counter = 0;
        currentX = 0;
        currentY++;

      } else if ( counter == gridWidth ) {

        gridHTML += `</tr></table>`;

      } else {
              currentX++;
      }


  }

document.getElementById("life_holder").innerHTML = gridHTML;

}

function newGen() {
  setStartCells();
  drawGrid( liveCells );
  currentGen = 1;
  document.getElementById("generation_holder").innerHTML = currentGen;
}

newGen();
