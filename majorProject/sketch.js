// Menu - Flight Program
// Asir Ratnani
// January 9, 2019
//
// The Following class was created with help from Travis Ahern (Thanks again!)

class Button {
  constructor(x,y,w,h,begcolR, begcolG, begcolB, overcolR, overcolG, overcolB,text,font,size){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.col_1R = begcolR;
    this.col_1G = begcolG;
    this.col_1B = begcolB;
    
    this.col_2R = overcolR
    this.col_2G = overcolG
    this.col_2B = overcolB

    this.text = text;
    this.font = font;
    this.size = size

  }

  pressed(){
    let isPressed = false;
    if (this.over()){
      fill(this.col_2R,this.col_2G,this.col_2B);
      if (mouseIsPressed){
        isPressed = true;
      }
    }
    else {
      fill(this.col_1R, this.col_1G, this.col_1B);
    }
    rect(this.x,this.y,this.width,this.height);

    fill(0);
    push();
    textSize(this.size);
    textFont(this.font);
    textAlign(CENTER);
    text(this.text,this.x + this.width/2,this.y+this.height/2+10);
    pop();
    return isPressed;
  }

  over(){
  
    return (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height);

  }
}

// Variables for Airport Boards
let widths = [475,330,175,125,125,250];
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

// Variables for Flight Orig/Dest
let todayButton, tomorrowButton, yesterdayButton;
let originDropdown, destDropdown;
let submitButton;
let flightDate;
let currentCombo;
let saskCal, saskTor, saskVanc, saskEdm;
let torSask, torCal, torVanc, torEdm;
let calSask, calTor, calVanc, calEdm;
let vanSask, vanTor, vanCal, vanEdm;
let edmSask, edmTor, edmCal, edmVanc;
let currentList;
let todayFlights = [];
let tomorrowFlights = [];
let yesterdayFlights = [];

// Variables for Menu
let state = 0;
let airlineCodes = new Map ();
let airportBoardsButton, flightNumberButton, origDestButton;
let plane;


function preload() {
  plane = loadImage("assets/plane.png");

  cyyz = loadJSON("assets/Airports/Toronto.json");
  cyxe = loadJSON("assets/Airports/Saskatoon.json");
  cyqr = loadJSON("assets/Airports/Regina.json");
  cyyc = loadJSON("assets/Airports/Calgary.json");
  cyvr = loadJSON("assets/Airports/Vancouver.json");
  cyul = loadJSON("assets/Airports/Montreal.json");
  klax = loadJSON("assets/Airports/Los Angeles.json");
  kjfk = loadJSON("assets/Airports/New York JFK.json");
  kord = loadJSON("assets/Airports/Chicago.json");
  egll = loadJSON("assets/Airports/London.json");
  lfpg = loadJSON("assets/Airports/Paris.json");
  omdb = loadJSON("assets/Airports/Dubai.json");
  yssy = loadJSON("assets/Airports/Sydney.json");

  flight_1 = loadJSON("assets/Flight Numbers/AC1129.json");
  flight_2 = loadJSON("assets/Flight Numbers/AC889.json");
  flight_3 = loadJSON("assets/Flight Numbers/AI945.json");
  flight_4 = loadJSON("assets/Flight Numbers/BA995.json");
  flight_5 = loadJSON("assets/Flight Numbers/EK242.json");
  flight_6 = loadJSON("assets/Flight Numbers/UA19.json");
  flight_7 = loadJSON("assets/Flight Numbers/WEN3369.json");
  flight_8 = loadJSON("assets/Flight Numbers/WS601.json");

  saskCal = loadJSON("assets/OrigDest Combos/SaskCal.json");
  saskTor = loadJSON("assets/OrigDest Combos/SaskTor.json");
  saskVanc = loadJSON("assets/OrigDest Combos/SaskVanc.json");
  saskEdm = loadJSON("assets/OrigDest Combos/SaskEdm.json");

  torSask = loadJSON("assets/OrigDest Combos/TorSask.json");
  torCal = loadJSON("assets/OrigDest Combos/TorCal.json");
  torVanc = loadJSON("assets/OrigDest Combos/TorVanc.json");
  torEdm = loadJSON("assets/OrigDest Combos/TorEdm.json");

  calSask = loadJSON("assets/OrigDest Combos/CalSask.json");
  calTor = loadJSON("assets/OrigDest Combos/CalTor.json");
  calVanc = loadJSON("assets/OrigDest Combos/CalVanc.json");
  calEdm = loadJSON("assets/OrigDest Combos/CalEdm.json");

  vanSask = loadJSON("assets/OrigDest Combos/VanSask.json");
  vanTor = loadJSON("assets/OrigDest Combos/VanTor.json");
  vanCal = loadJSON("assets/OrigDest Combos/VanCal.json");
  vanEdm = loadJSON("assets/OrigDest Combos/VanEdm.json");

  edmSask = loadJSON("assets/OrigDest Combos/EdmSask.json");
  edmTor = loadJSON("assets/OrigDest Combos/EdmTor.json");
  edmCal = loadJSON("assets/OrigDest Combos/EdmCal.json");
  edmVanc = loadJSON("assets/OrigDest Combos/EdmVanc.json");

  codes = loadStrings("assets/AirlineCodes.txt");
  font_1 = loadFont("assets/fonts/open-24-display/Open 24 Display St.ttf");
  font_2 = loadFont("assets/fonts/digital-dream/DigitalDream.ttf");
  font_3 = loadFont("assets/fonts/famirids/Famirids..ttf");
  font_4 = loadFont("assets/fonts/game_over.ttf")
  font_5 = loadFont("assets/fonts/Solari.ttf");
}

function setup() {
  setAirlineCodes();


  if (state === 0) {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(3);
    airportBoardsButton = new Button(75, height-125, 250, 55, 43, 229, 86, 229, 43, 176, "Airport Boards", font_4,89);
    flightNumberButton = new Button(75,height/2, 250, 55, 43, 229, 86, 229, 43, 176, "Status by Flight Number", font_4, 55);
    origDestButton = new Button (75, 165, 250, 55, 43, 229, 86, 229, 43, 176, "Status by Origin/Dest.", font_4, 60);

  }

  else if (state === 1) {
    createCanvas(2000, 900); 
    drawButtons();
    setupCityMenu();
    info = cyxe;
    cellSize = height / rows;
  
    x = 10;
    y = 45;
  }
  else if (state === 2) {
    createCanvas(windowWidth, windowHeight);
    flightInfo = flight_1;
    menuState = 1;
    background(45);
    // alert("Welcome to the Flight Status Checker, To begin please enter in the flight number :)");
    makeDate();
    makeInputBox();
    drawText();
  }
  else if (state === 3) {
    createCanvas(windowWidth, windowHeight);
    background(45);
    setAirlineCodes();
    setupOriginDest();
    makeSubmitButton();
  }
}

function draw() {

  if (state === 0) {
    image(plane, 0, 0, width, height);
    drawMainScreenText();

    airportBoardsButton.pressed();
    flightNumberButton.pressed();
    origDestButton.pressed();

    if (airportBoardsButton.pressed()) {
      state = 1;
      setup();
      redraw();
    }
    else if (flightNumberButton.pressed()) {
      state = 2;
      setup();
      redraw();
    }
    else if (origDestButton.pressed()) {
      state = 3;
      setup();
      redraw();
    }
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
  else if (state === 3) {

    drawOriginDestText();
  }

}

function drawMainScreenText() {
  fill(0);
  textFont(font_4);
  textSize(145);
  textAlign(CENTER);
  text("FLIGHT CHECKER VERSION 5.6! (BETA EDITION)", width/2, 66);
  textSize(80);
  text("Developed By: Asir Ratnani; API Usage from FlightAware", width/2, 105);
}

function setAirlineCodes() {
  for (let i =0; i < codes.length; i ++) {
    let airCode = codes[i].split(" ")[0];
    let airlineName = codes[i].substr(4, );
    airlineCodes.set(airCode, airlineName);

  }
}

function keyPressed() {
  if (key === "Escape") {
    state = 0;
    removeElements();
    setup();
    redraw();
    loop();
  }
}

function mouseClicked() {
  if (state === 2){
    if (mouseX > width/2-75 && mouseX < width/2 + 125) {
      if (mouseY > height-150 && mouseY < height-100) {
        if (flightState === 3) {
          noLoop();
        }
        else if (flightState === 2) {
          flightState = 1;
          background(45);
          drawText();
          createMenu();
          redraw();

        }
        else {
          flightState = 2;
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
        flightState = 1;
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
        flightState = 1;
        redraw();
      }
    }
    if (mouseX > width/2+300 && mouseX < width/2 + 500) {
      if (mouseY > height-150 && mouseY < height-100) {
        if (menuState === 2 || menuState === 3) {
          noLoop();
        }
        menuState = 3;
        flightState = 1;

        background(45);
        drawText();
        createMenu();
        redraw();
      }
    }
  }
  else if (state === 3) {
    if (mouseX > width-250 && mouseX < width-30) {
      if (mouseY > height/2 && mouseY < height/2+65) {
        currentList = todayFlights;
        displayOriginDest();
      }
      else if (mouseY > height/2-110 && mouseY < height/2-45) {
        currentList = tomorrowFlights;
        displayOriginDest();
  
      }
      else if (mouseY > height/2+110 && mouseY < height/2+175) {
        currentList = yesterdayFlights;
        displayOriginDest();
  
      }
    }
  }
}
