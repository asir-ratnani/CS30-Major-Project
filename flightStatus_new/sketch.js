// Flight Status - Manual Edition
// Asir Ratnani
// January 9, 2019

// API Key = fc2a7d607c39780ddb797b27a76572a79d82ff12

// Notes to Self:
//
// Create Menu to tie it all together:)


let airlineCodes = new Map ();
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
let state = 0;
let menuState;
let button_1;


function preload() {
  font_1 = loadFont("assets/open-24-display/Open 24 Display St.ttf");
  font_2 = loadFont("assets/digital-dream/DigitalDream.ttf");
  codes = loadStrings("assets/AirlineCodes.txt")
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
  menuState = 1;
  createCanvas(windowWidth, windowHeight);
  background(45);
  // alert("Welcome to the Flight Status Checker, To begin please enter in the flight number :)");
  makeDate();
  makeInputBox();
  drawText();
  setAirlineCodes();
  
}



function draw() {
  checkMenuState();
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
  for (let j = 0; j < todayFlightList.length; j++) {
    todayFlightList.shift();
  }
  for (let j = 0; j < nextFlightList.length; j++) {
    nextFlightList.shift();
  }
  for (let j = 0; j < previousFlightList.length; j++) {
    previousFlightList.shift();
  }

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
  }
  background(45);
  drawText();
  createMenu();
  state = 1;
  redraw();
}
function makeInputBox() {
  input = createInput("AC1129");
  input.position(width/2-100,height/2);

  inputButton = createButton("Submit");
  inputButton.position(input.x + input.width,height/2);
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
}

function displayFlightInfo(ident) {
  if (state === 1){
    console.log("!")
    fill(255,216,0);
    textFont(font_2);
    textSize(12);
    textAlign("LEFT");
    text("Date of Flight:", width/2-500, height/2+25);
    fill("green");
    text(ident.estimated_departure_time.date, width/2-350, height/2+25);
    textSize(17);
    textAlign(CENTER);

    flightNum = ident.airline_iata + ident.flightnumber;
    origin = ident.origin.city;
    originCode = ident.origin.code;
    destination = ident.destination.city;
    destinationCode = ident.destination.code;
    let depSplit = ident.status.split(" ");

    text(flightNum + " from " + origin + " to " + destination, width/2,height/2 + 65);
    if (ident.status === "Scheduled") {
      text("is scheduled to depart at " + ident.estimated_departure_time.time + " (" + ident.estimated_departure_time.tz + ") " + "and is scheduled", width/2, height/2+110);
      text("to arrive at " + ident.estimated_arrival_time.time + " (" + ident.estimated_arrival_time.tz + "). ", width/2, height/2+145);
    }
    else if (depSplit[0] === "On" && depSplit[1] === "The" && depSplit[2] === "Way!") {
      text("departed at " + ident.actual_departure_time.time + " (" + ident.actual_departure_time.tz + ") and is", width/2,height/2+110);
      text("scheduled to arrive at " + ident.estimated_arrival_time.time + " (" + ident.estimated_arrival_time.tz + ") ", width/2, height/2+145);
    }
    else {
      text("departed at " + ident.actual_departure_time.time + " (" + ident.actual_departure_time.tz + ") and arrived in", width/2, height/2+110);
      text(destination + " at " + ident.actual_arrival_time.time + " (" + ident.actual_arrival_time.tz + ") ", width/2, height/2+145);
    }
  }
  
  else if (state === 2) {

    let distanceKm = Math.floor(ident.distance_filed*1.609);
    if (ident.codeshares !== undefined) {
      let codeshareLength = ident.codeshares.split(",");
      if (codeshareLength.length < 4) {
        if (codeshareLength.length === 3){
          text(ident.codeshares, width/2 -50, 160);
        }
        else if (codeshareLength.length === 2){
          text(ident.codeshares, width/2 -100, 160);
        }
        else {
          text(ident.codeshares, width/2 -150, 160)
        }
      }
      else {
        text(codeshareLength[0] + "," + codeshareLength[1] + "," + codeshareLength[2],width/2-45, 160);
      }
    }

    textAlign(LEFT);
    fill(255,216,0);
    text("Status: ", width/2 - 350,100);
    text("Codeshares: ", width/2-350, 160);
    text("Airline: ", width/2+205, 100);
    text("Aircraft Type: ", width/2+205, 160);
    text ("Distance: ", width/2-350, 220);
    text("Filed Altitude: ", width/2+205, 220);

    fill("green");
    text(ident.status, width/2 -250, 100);
    text(airlineCodes.get(ident.airline), width/2 + 340, 100);
    text(ident.full_aircrafttype, width/2 + 410, 160);
    text(distanceKm + " km", width/2- 220,220);
    text(ident.display_filed_altitude, width/2 + 405, 220);


  }
  noLoop();
}



function drawText() {

  textFont("Arial");
  textStyle("bold");
  fill(0);
  textAlign(CENTER);
  textSize(22);
  text("Enter your Flight # below", width/2+10,height/2-20);

  textFont(font_1);
  textAlign(LEFT);
  fill(255);
  textSize(32);
  text("Examples:", 105, 100);
  line(100, 110, 250, 110);

  textSize(24);
  fill(200,0,0);
  text("AC1129", 110, 140);
  text("AC889", 110, 165);
  fill(255,159,5);
  text("AI945", 110, 190);
  fill(5,163,255);
  text("BA995", 110, 215);
  fill(234,209,46);
  text("EK242", 110, 240);
  fill(43,61,196);
  text("UA19", 110, 265);
  fill(35,133,155);
  text("WEN3369", 110, 290);
  text("WS601", 110, 315);

}

function createMenu() {
  textAlign(CENTER);
  fill(50,35,195);
  rect(width/2-75, height - 150, 200, 50);
  fill(0);
  textSize(20);
  textFont(font_2);
  text("More Details", width/2+25, height-120);

  fill(50,35,195);
  rect(width/2-475, height - 150, 200, 50);
  fill(0);
  textSize(18);
  textFont(font_2);
  text("Previous Date", width/2-375, height-120);

  fill(50,35,195);
  rect(width/2+300, height - 150, 200, 50);
  fill(0);
  textSize(21);
  textFont(font_2);
  text("Next Date", width/2+400, height-120);

  fill(50,35,195);
  rect(width/2-75, height - 90, 200, 50);
  fill(0);
  textSize(20);
  textFont(font_2);
  text("Current Date", width/2+25, height-55);
}

function mouseClicked() {
  if (mouseX > width/2-75 && mouseX < width/2 + 125) {
    if (mouseY > height-150 && mouseY < height-100) {
      if (state === 3) {
        noLoop();
      }
      else if (state === 2) {
        state = 1;
        background(45);
        drawText();
        createMenu();
        redraw();

      }
      else {
        state = 2;
        redraw();
      }
    }
  }

  if (mouseX > width/2-75 && mouseX < width/2 + 125) {
    if (mouseY > height-90 && mouseY < height-40) {
      if (menuState === 2 || menuState === 3){
        noLoop();
      }
      menuState = 1;
      background(45);
      drawText();
      createMenu();
      state = 1;
      redraw();
    }
  }
  if (mouseX > width/2-475 && mouseX < width/2 - 275) {
    if (mouseY > height-150 && mouseY < height-100) {
      if (menuState === 3 || menuState === 1) {
        noLoop();
      }
      menuState = 2;
      background(45);
      drawText();
      createMenu();
      state = 1;
      redraw();
    }
  }
  if (mouseX > width/2+300 && mouseX < width/2 + 500) {
    if (mouseY > height-150 && mouseY < height-100) {
      if (menuState === 2 || menuState === 3) {
        noLoop();
      }
      menuState = 3;
      state = 1;

      background(45);
      drawText();
      createMenu();
      redraw();
    }
  }
}



function setAirlineCodes() {
  for (let i =0; i < codes.length; i ++) {
    let airCode = codes[i].split(" ")[0];
    let airlineName = codes[i].substr(4, );
    airlineCodes.set(airCode, airlineName);

  }
}

function checkMenuState(){
  if (menuState === 1){
    if (todayFlightList.length > 0) {
      displayFlightInfo(todayFlightList[0]);
    }
    else if (state === 1 && todayFlightList.length === 0){
      fill("red");
      text("Sorry! There is no flight scheduled for this date!", width/2+25, height-250);
      fill(255,216,0);
      textFont(font_2);
      textSize(12);
      textAlign("LEFT");
      text("Date of Flight:", width/2-500, height/2+25);
      fill("green");
      text(currentDate, width/2-350, height/2+25);
      noLoop();
    }
  }
  else if (menuState === 2) {
    if (previousFlightList.length > 0) {
      displayFlightInfo(previousFlightList[0]);
    }
    else if (state === 1 && previousFlightList.length === 0){
      fill("red");
      text("Sorry! There is no flight scheduled for this date!", width/2+25, height-250);
      fill(255,216,0);
      textFont(font_2);
      textSize(12);
      textAlign("LEFT");
      text("Date of Flight:", width/2-500, height/2+25);
      fill("green");
      text(previousDate, width/2-350, height/2+25);
      noLoop();
    }
  }
  else if (menuState === 3) {
    if (nextFlightList.length > 0) {
      displayFlightInfo(nextFlightList[0]);
    }
    else if (state === 1 && nextFlightList.length === 0){
      fill("red");
      text("Sorry! There is no flight scheduled for this date!", width/2+25, height-250);
      fill(255,216,0);
      textFont(font_2);
      textSize(12);
      textAlign("LEFT");
      text("Date of Flight:", width/2-500, height/2+25);
      fill("green");
      text(nextDate, width/2-350, height/2+25);
      noLoop();
    }
  }
}