// Flight Status - Manual Edition
// Asir Ratnani
// January 9, 2019


// This function formats the current date to the same format as the JSON file. It is not used currently as the 
// information is not live. It is hardcoded so the dates must be hardcoded also. 

function makeDate(){
  if (month() < 10) {
    todaym = "0" + month();
  }
  else {
    todaym = month();
  }
  todayy = year();
  todayd = day();
  previousd = day()-1;
  nextd = day() +1;

  currentDate = todayy + "/" + todaym + "/" + todayd;
  nextDate = todayy + "/" + todaym + "/" + nextd;
  previousDate = todayy + "/" + todaym + "/" + previousd;

}

// Pushes flights to empty arrays based on their dates. (Today, tomorrow, yesterday, etc.)
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
    if (flightInfo.FlightInfoStatusResult.flights[i].estimated_departure_time.date === "2019/01/21") {
      todayFlightList.push(flightInfo.FlightInfoStatusResult.flights[i]);
    }
    if (flightInfo.FlightInfoStatusResult.flights[i].estimated_departure_time.date === "2019/01/22"){
      nextFlightList.push(flightInfo.FlightInfoStatusResult.flights[i]);
    }
    if (flightInfo.FlightInfoStatusResult.flights[i].estimated_departure_time.date === "2019/01/20") {
      previousFlightList.push(flightInfo.FlightInfoStatusResult.flights[i]);
    }

  }
  background(45);
  drawText();
  createMenu();
  flightState = 1;
  redraw();
}

// This creates the user input box and it's properties.
function makeInputBox() {
  input = createInput("Ex. AC1129");
  input.position(width/2-100,height/2);

  inputButton = createButton("Submit");
  inputButton.position(input.x + input.width,height/2);
  inputButton.mousePressed(saveFlight);
}

// Checks the combination of user input and flight number. Loads the correct JSON file in return.
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

// If flightState = 1; Basic information is provided
// If flightState = 2; More Details are provided about the flight

// Displays the saved flight info from a preloaded JSON file. Takes in parameter "ident" which means flight number. (Which flight are you displaying)
function displayFlightInfo(ident) {
  if (flightState === 1){
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
    else if (ident.actual_departure_time.epoch === 0 && ident.actual_arrival_time.epoch === 0) {
      text("is scheduled to depart at " + ident.estimated_departure_time.time + " (" + ident.estimated_departure_time.tz + ") " + "and is scheduled", width/2, height/2+110);
      text("to arrive at " + ident.estimated_arrival_time.time + " (" + ident.estimated_arrival_time.tz + "). ", width/2, height/2+145);
    }
    else{
      text("departed at " + ident.actual_departure_time.time + " (" + ident.actual_departure_time.tz + ") and arrived in", width/2, height/2+110);
      text(destination + " at " + ident.actual_arrival_time.time + " (" + ident.actual_arrival_time.tz + ") ", width/2, height/2+145);
    }
  }
  
  else if (flightState === 2) {

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


// Draws the text at the beginning.
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

// Creates the menu buttons. More Details, Current Date, Previous Date, Next Date, etc.
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

// If menuState = 1; Display current date info.
// If menuState = 2; Display previous date info.
// If menuState = 3; Display next date info.

// Checks the state of the date
function checkMenuState(){
  if (menuState === 1){
    if (todayFlightList.length > 0) {
      displayFlightInfo(todayFlightList[0]);
    }
    else if (flightState === 1 && todayFlightList.length === 0){
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
    else if (flightState === 1 && previousFlightList.length === 0){
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
    else if (flightState === 1 && nextFlightList.length === 0){
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