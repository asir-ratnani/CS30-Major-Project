// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Variables for Airport Boards
let widths = [475,330,175,125,125,250];
let airlineCodes = new Map ();
let rows = 15;
let cols = 6;
let x,y;
let cellSize;
let info;
let departures, arrivals, scheduled, enroute;
let typeOfFlight;
let airportState = 1;
let status;
let font_1, font_2, font_3;
let airport_code;
let codes;
let cyxe, cyqr, cyyz, cyyc, cyvr, cyul;
let klax, kjfk, kord, egll, lfpg, omdb, yssy;
let departureButton, scheduledButton, arrivalButton;

// Variables for Flight Status 
let input;
let inputButton;
let header_1;
let flightInfo;
let currentDate, nextDate, previousDate;
let todayy,todaym,todayd,previousd,nextd;
let todayFlightList = [];
let nextFlightList = [];
let previousFlightList = [];
let flightNum;
let origin, originCode;
let destination,destinationCode;
let flightState = 0;
let menuState;
let button_1;
let flight_1,flight_2,flight_3,flight_4,flight_5,flight_6,flight_7,flight_8;

let state = 0;


function preload() {
  cyyz = loadJSON('assets/Toronto.json')
  cyxe = loadJSON('assets/Saskatoon.json')
  cyqr = loadJSON('assets/Regina.json')
  cyyc = loadJSON('assets/Calgary.json')
  cyvr = loadJSON('assets/Vancouver.json')
  cyul = loadJSON('assets/Montreal.json')
  klax = loadJSON('assets/Los Angeles.json')
  kjfk = loadJSON('assets/New York JFK.json')
  kord = loadJSON('assets/Chicago.json')
  egll = loadJSON('assets/London.json')
  lfpg = loadJSON('assets/Paris.json')
  omdb = loadJSON('assets/Dubai.json')
  yssy = loadJSON('assets/Sydney.json')
  codes = loadStrings('assets/AirlineCodes.txt');
  font_1 = loadFont("assets/open-24-display/Open 24 Display St.ttf");
  font_2 = loadFont("assets/digital-dream/DigitalDream.ttf");
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
  setAirlineCodes();

  if (state === 0) {
    createCanvas(windowWidth, windowHeight);
  }

  else if (state === 1) {
    createCanvas(2000, 900);
    drawButtons();
    setupCityMenu();
    info = cyxe;
    cellSize = height / rows;
  
    x = 10;
    y = 45;
    noLoop();  
  }
  else if (state === 2) {
    menuState = 1;
    createCanvas(windowWidth, windowHeight);
    background(45);
    // alert("Welcome to the Flight Status Checker, To begin please enter in the flight number :)");
    makeDate();
    makeInputBox();
    drawText();
  }

}

function draw() {
  if (state === 0) {
    background(125);
    fill(0);
    text("Menu", width/2, height/2);
  }
  else if (state === 1) {
    background(20);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    fill(125,78,255);
    text("Airport Boards", width - 300, 175);
    text ("Choose your city below", width - 300, 225);

    departures = info.AirportBoardsResult.departures.flights;
    arrivals = info.AirportBoardsResult.arrivals.flights;
    scheduled = info.AirportBoardsResult.scheduled.flights;
    enroute = info.AirportBoardsResult.enroute.flights;

    determineState();
    displayGrid();
    displayJSON();
    noLoop();
  }
  else if (state === 2) {
    checkMenuState();
  }
}


function keyPressed() {
  if (state === 0 && key === "a") {
    state = 1;
    setup();
  }
  else if (state === 1 && key === "s") {
    state = 2;
    setup();
  }
  else if (state === 2 && key === "d") {
    state = 0;
    setup();
  }
}