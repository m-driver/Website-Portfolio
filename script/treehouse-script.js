// $(function(){
//
//   getJSON('https://teamtreehouse.com/michaeldriver2.json',
//   function(err, data) {
//     if (err !== null) {
//       alert('Something went wrong: ' + err);
//     } else {
//       alert('Your query count: ' + data.query.count);
//     }
//   });
//
// });
var xmlhttp = new XMLHttpRequest();
var url = "https://teamtreehouse.com/michaeldriver2.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        Object.entries(myArr).forEach(([key, value]) => console.log(`${key}: ${value}`));
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
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
