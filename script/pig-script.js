/**
 * SEt the picture in the gallery and the image alt based on the
 * array number
 *
 * @param {number} picNumber - The location in the arrays of the picture and alt
 */

function setPicture( picNumber ) {

  let currentPicture = pictureArray[ picNumber ];
  let newAlt = pictureAlts[ picNumber ];
  console.log(newAlt);
  // Set the picture-holder div to contain the default picture
  document.getElementById("picture-holder").innerHTML = `<img src=${currentPicture} alt="${newAlt}" id="current-pig-pic" class="gallery-pic">`;

  //Get the dimensions of the current picture as it willd display
  let pictureIdentification = document.getElementById("current-pig-pic");
  let picWidth = pictureIdentification.width;
  let picHeight = pictureIdentification.height;

  //Make the container div dimensions match the picture
  document.getElementById("picture-holder").style.width = `${picWidth}px + 4px`;
  document.getElementById("picture-holder").style.height = `${picHeight}px + 4px`;


}

/**
 * A function to change the picture in the gallery.
 *
 * @param {number} picDirection - 1 for left, 0 for right.
 */

function changePicture ( picDirection ) {

  if ( picDirection === 1 ) {
    picID -= 1;

    if ( picID < 0 ) {
      picID = pictureArray.length - 1;
    }

    setPicture( picID );

  } else {
    picID += 1;

    //If the ID number would be too high, go back to picture zero.
    if ( picID > ( pictureArray.length - 1 ) ) {

      picID = 0;

    }

    setPicture( picID );
  }

}

//The picture array for the gallery.
const pictureArray = ["img/Marshmallow_Frontview.jpg",
  "img/Bothpigs_Frontview.jpg",
  "img/Cocoa_Frontview.jpg",
  "img/Cocoa_Sideview.jpg",
  "img/Marshmallow_Sideview.jpg"];

//An array of alt descriptions aligning with the pictures.
const pictureAlts = ["A picture of Marshmallow the guinea pig from the front on a rug with blue marks",
  "Two guinea pigs standing together on a white blanket",
  "A close up view of a guinea pig's face",
  "A guinea pig with a large white stripe on beige carpet",
  "A guinea pig viewed from the side"];

//Defaults the picture ID number to zero.
let picID = 0;

 // Default image
setPicture( picID );
