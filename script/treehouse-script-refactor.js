
var url = "https://teamtreehouse.com/michaeldriver2.json";

async function retrieveJSON(sourceURL) {

  const retrievedURL = await fetch(sourceURL);
  return retrievedURL;

}

async function convertJSON(originalData) {
  const newData = await originalData.json();
  return newData;
}

function generateHTML(arr) {
    var out = "";
    var i;

    console.log(arr.badges[1].name);
    console.log(arr);
    for(i = 0; i < arr.badges.length; i++) {

        out += `<div class="col-lg-3 col-md-4 col-sm-6 "><div class="card m-1" style="width: 13rem;"> \
          <img class="card-img-top" src="${arr.badges[i].icon_url}" alt="Course badge"> \
          <div class="card-body bg-secondary"> \
            <h5 class="card-title text-white">${arr.badges[i].name}</h5> \
          </div> \
        </div> \
        </div>`;

    }
    document.getElementById("achievement_holder").innerHTML = out;
}


retrieveJSON(url)
  .then(jsonObject => convertJSON(jsonObject))
  .then(parsedJSON => generateHTML(parsedJSON))
  .catch( ( error ) => console.log('There was an error: ' + error));
