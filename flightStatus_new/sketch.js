// Flight Status - Manual Edition
// Asir Ratnani
// January 9, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// API Key = fc2a7d607c39780ddb797b27a76572a79d82ff12

// Notes to Self:
// 
// Add Shifting between day after and day before
// Add more info about flights.
// If there are no flights that day, send a message
// PLEASE ADD COLOUR, ITS SO BLAND
// Create Menu to tie it all together:)

let input;
let inputButton;
let header_1;
let flightInfo;
let currentDate, nextDate, previousDate;
let y,m,todayd,previousd,nextd;
let todayFlightList = [];
let nextFlightList = [];
let previousFlightList = [];
let flightNum;
let origin, originCode;
let destination,destinationCode;




function preload() {
  flight_1 = loadJSON("assets/AC1129.json");
  flight_2 = loadJSON("assets/AC889.json");
  flight_3 = loadJSON("assets/AI945.json");
  flight_4 = loadJSON("assets/BA995.json");
  flight_5 = loadJSON("assets/EK242.json");
  flight_6 = loadJSON("assets/UA19.json");
  flight_7 = loadJSON("assets/WEN3369.json");
  flight_8 = loadJSON("assets/WS601.json");
}
  
function setup() {
  createCanvas(windowWidth, windowHeight);
  alert("Welcome to the Flight Status Checker, To begin please enter in the flight number :)");
  makeDate();

  
}

function draw() {
  background(220);
  makeInputBox();
  displayFlightInfo(todayFlightList[0]);
}

function makeDate(){
  if (month() < 10) {
    m = "0" + month();
  }
  else {
    m = month();
  }
  y = year();
  todayd = day();
  previousd = day()-1;
  nextd = day() +1;

  currentDate = y + "/" + m + "/" + todayd;
  nextDate = y + "/" + m + "/" + nextd;
  previousDate = y + "/" + m + "/" + previousd;



}

function checkFlight(){
  for (let i = 0; i < flightInfo.FlightInfoStatusResult.flights.length; i++) {
    if (flightInfo.FlightInfoStatusResult.flights[i].estimated_departure_time.date === currentDate) {
      todayFlightList.push(flightInfo.FlightInfoStatusResult.flights[i]);
    }
    if (flightInfo.FlightInfoStatusResult.flights[i].estimated_departure_time.date === nextDate){
      nextFlightList.push(flightInfo.FlightInfoStatusResult.flights[i]);
    }
    if (flightInfo.FlightInfoStatusResult.flights[i].estimated_departure_time.date === previousDate) {
      previousFlightList.push(flightInfo.FlightInfoStatusResult.flights[i]);
    }
    // else {
    //   console.log ("else");
    // }
  }
  redraw();
  for (let j = 0; j < todayFlightList.length; j++) {
    todayFlightList.shift();
  }
  for (let j = 0; j < nextFlightList.length; j++) {
    nextFlightList.shift();
  }
  for (let j = 0; j < previousFlightList.length; j++) {
    previousFlightList.shift();
  }
}

function makeInputBox() {
  input = createInput("Ex: AC1129");
  input.position(200,75);

  inputButton = createButton("Submit");
  inputButton.position(input.x + input.width,75);
  inputButton.mousePressed(saveFlight);
}

function saveFlight() {
  let flight = input.value();
  if (flight === "AC1129") {
    flightInfo = flight_1;
    checkFlight();
  }
  else if (flight === "AC889") {
    flightInfo = flight_2;
    checkFlight();
  }
  else if (flight === "AI945") {
    flightInfo = flight_3;
    checkFlight();
  }
  else if (flight === "BA995") {
    flightInfo = flight_4;
    checkFlight();
  }
  else if (flight === "EK242") {
    flightInfo = flight_5;
    checkFlight();
  }
  else if (flight === "UA19") {
    flightInfo = flight_6;
    checkFlight();
  }
  else if (flight === "WEN3369") {
    flightInfo = flight_7;
    checkFlight();
  }
  else if (flight === "WS601") {
    flightInfo = flight_8;
    checkFlight();
  }  
  else {
    fill(0);
    textSize(15);
    fill(0,0,255);

    header_1 = createElement("h1","Oops, We can't seem to find that flight, Why don't you try again?");
    header_1.position(120, 200);
    header_1.style('font-size', 5);
  }
}

function displayFlightInfo(ident) {
 flightNum = ident.airline_iata + ident.flightnumber;
 origin = ident.origin.city;
 originCode = ident.origin.code;
 destination = ident.destination.city;
 destinationCode = ident.destination.code;



 text(flightNum + " from " + origin + " to " + destination, 125,125);
 
 if (ident.status === "Scheduled") {
   text("is scheduled to depart at " + ident.estimated_departure_time.time + " (" + ident.estimated_departure_time.tz + ") " + "and is scheduled", 125, 140)
   text("to arrive at " + ident.estimated_arrival_time.time + " (" + ident.estimated_arrival_time.tz + "). ", 125, 155);
  }
}