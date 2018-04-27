'use strict';

/** define some variables */
let url = 'js/webdevtest-data.js';
let element;
let node = '';
let entries = '';
let drawings = '';
let exportedDrawings = '';

/**Read the URL parameters*/
let params = new URLSearchParams(document.location.search.substring(1));
let promoID = params.get("promo");

if(promoID){

  /** Reset dom */
  document.getElementById('list').innerHTML = "";
  document.getElementById("body").classList.add("bgGradient");

  /** Fetching the data object and displaying the selected item */
  fetch(url, {
    method: 'GET',
  }).then(response => response.json())
    .catch(error => console.log('Error:', error))
    .then(function(data){

      /**Creating new variable for the data */
      let datas = [];
      datas = data.promotion_objects;
      let counter = 0;
      let identifier = promoID.split("promo");
      identifier = parseInt(identifier[1])-1;

      /**Looping the object and building the output */
      for (let i = 0; i < datas.length; i++) {
          if(identifier===i){
            node += "<div class='image imagePromo'><img src='"+datas[i].promo_image_url+"'></div>";
            node += "<div class='title titlePromo'>"+datas[i].promotion_name+"</div>";
            node += "<div class='summary summaryPromo'>"+datas[i].summary+"</div>";

            var nextDeadline = datas[i].drawings.length-1;
            nextDeadline = convertDate(datas[i].drawings[nextDeadline].entry_deadline);

            entries = getEntries(datas[i].entries);
            drawings = getDrawings(datas[i].drawings)+"<div class='entry_info'>"+datas[i].entry_info+"<div>";
            exportedDrawings = datas[i].drawings;
          }
      }

      /** Updating DOM, inserting the result */
      document.getElementById('list').innerHTML = node;
      document.getElementById('drawings').innerHTML = drawings;
      document.getElementById('entries').innerHTML = entries;
      document.getElementById('next_deadline').innerHTML = "<div class='center'>The Next Entry Deadline is<br>"+nextDeadline+"!</div>";
    })

}
else{
  /**Removing gradient class from body */
  document.getElementById("body").classList.remove("bgGradient");
  /** Fetching the data object and handling the response and errors, displaying the list */
  fetch(url, {
    method: 'GET',
  }).then(response => response.json())
    .catch(error => console.log('Error:', error))
    .then(function(data){

      /**Creating new variable for the data */
      var datas = [];
      datas = data.promotion_objects;
      var counter = 0;

      /**Looping the object and building the output */
      for (let i = 0; i < datas.length; i++) {
          counter = i+1;
          node += "<div class='image'><img src='"+datas[i].promo_image_url+"'></div>";
          node += "<div class='title'><a href='/index.html?promo=promo0"+counter+"'>"+datas[i].promotion_name+"</a></div>";
          node += "<div class='summary'>"+datas[i].summary+"</div>";
          var nextDrawing = datas[i].drawings.length-1;
          nextDrawing = convertDate(datas[i].drawings[nextDrawing].drawing_date);
          node += "<div class='next-date'>Next drawing date: "+nextDrawing+"</div>";
      }

      /** Updating DOM, inserting the result */
      document.getElementById('list').innerHTML = node;
    })
}

function getEntries(data){
  
  var item = "<div class='tableHead'>Your total tickets Entered: "+data.length+"</div>";
  item += "<div class='tableSubHead'>All entries are locked in at time they are submitted and cannot be deleted.</div>";
  item += "<div class='table'>";
  item += "<div class='row rowHeader'>";
  item += "<div class='left'>ENTRY NUMBER</div>";
  item += "<div class='right'>DATE</div>";
  item += "</div>";
  for (let i = 0; i < data.length; i++) {
    item += "<div class='row'>";
    item += "<div class='left td' data-label='ENTRY NUMBER'>"+data[i].entry_number+"</div>";
    item += "<div class='right td' data-label='DATE'>"+convertDate(data[i].date)+"</div>";
    item += "</div>";
  }
  item += "</div>";
  return item;
}

function getDrawings(data){

  var item = "<div class='tableHead'>Drawing Schedule</div>";
  item += "<div class='table'>";
  item += "<div class='row rowHeader'>";
  item += "<div class='left'>PRIZE</div>";
  item += "<div class='middle'>ENTRY DEADLINE</div>";
  item += "<div class='right'>DRAWING DATE</div>";
  item += "</div>";
  for (let i = 0; i < data.length; i++) {
    item += "<div class='row'>";
    item += "<div class='left td' data-label='PRIZE'>"+data[i].prize+"</div>";
    item += "<div class='middle td' data-label='ENTRY DEADLINE'>"+convertDate(data[i].drawing_date)+"</div>";
    item += "<div class='right td' data-label='DRAWING DATE'>"+convertDate(data[i].entry_deadline)+"</div>";
    item += "</div>";
  }
  item += "</div>";
  return item;
}

function convertDate(dateInput){

  var days = '';
  var dayName = '';
  var months = '';
  var monthName = '';

  var d = new Date(dateInput),
  month = d.getMonth(),
  day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate(),
  year = d.getFullYear(),

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayName = days[d.getDay()];

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthName = months[d.getMonth()];

  var today = dayName+", " + monthName + " " + day + ", " + year;
  return today;
}
