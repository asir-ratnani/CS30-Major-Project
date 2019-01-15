// Major Project - Airport Boards (Manual)
// Asir Ratnani
// December 11, 2018
//
// Nice to Have List:
// - Live pull from server
// - Format buttons to make it look nicer
// - Format page to make it look nicer
// - Add in window resizing (aka no values in width and height)
// - Optimize for mobile devices

let widths = [475,330,175,125,125,250];
let airlineCodes = new Map ();
let rows = 15;
let cols = 6;
let x,y;
let cellSize;
let info;
let departures, arrivals, scheduled, enroute;
let typeOfFlight;
let state = 1;
let status;
let font_1, font_2, font_3;
let airport_code;
let codes;
let cyxe, cyqr, cyyz, cyyc, cyvr, cyul;
let klax, kjfk, kord, egll, lfpg, omdb, yssy;
let departureButton, scheduledButton, arrivalButton;


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
  


  
  codes = loadStrings('assets/AirlineCodes.txt')
  font_1 = loadFont("assets/open-24-display/Open 24 Display St.ttf");
  font_2 = loadFont("assets/famirids/Famirids..ttf");
  font_3 = loadFont("assets/digital-dream/DigitalDream.ttf");
}

function setup() {
  createCanvas(2000, 900);
  drawButtons();
  setupCityMenu();
  info = cyxe;
  setAirlineCodes();
  cellSize = height / rows;

  x = 10;
  y = 45;

}

function draw() {
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
function determineState() {
  if (state === 1) {
    status = scheduled;
    fill(0, 225, 60);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(info.AirportBoardsResult.airport_info.name + " Airport", width - 300, height / 2);
    text("Scheduled Flights", width - 300, height/2 + 55);

    fill(200);
    textFont(font_3);
    textSize(28);
    textAlign(CENTER);
    text("SCHEDULED", 170, 40);
  }

  else if (state === 2) {
    status = departures;

    fill(0, 255, 60);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(info.AirportBoardsResult.airport_info.name + " Airport", width - 300, height / 2);
    text("Departed Flights", width - 300, height/2 + 55);

    fill(200);
    textFont(font_3);
    textSize(28);
    textAlign(CENTER);
    text("DEPARTED", 170, 40);
  }
  else if (state === 3) {
    status = arrivals;

    fill(0, 255, 60);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(info.AirportBoardsResult.airport_info.name + " Airport", width - 300, height / 2);
    text("Arrived Flights", width - 300, height/2 + 55);

    fill(200);
    textFont(font_3);
    textSize(28);
    textAlign(CENTER);
    text("ARRIVALS", 170, 40);
  }
  
  // else if (state === 4) {
  //   status = enroute;
  // }
}
function displayJSON() {
  textAlign(LEFT);
  fill(200);
  textFont(font_3);
  textSize(28);
  text("AIRLINE", widths[0] + 80, 40);
  text("FLIGHT", widths[0] + widths[1]+ 20, 40);
  text("STATUS", widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + 50, 40);
  textSize(14);
  text("EST.TIME", widths[0] + widths[1] + widths[2] + 10, 20);
  text("ACTUAL TIME", widths[0] + widths[1] + widths[2] + widths[3] + 5, 22);
  if (status === arrivals) {
    text("ARRIVAL", widths[0] + widths[1] + widths[2] + 10, 50);
    text("ARRIVAL", widths[0] + widths[1] + widths[2] + widths[3] + 12, 50);
  }
  else {
    text("DEPARTURE", widths[0] + widths[1] + widths[2] + 10, 50);
    text("DEPARTURE", widths[0] + widths[1] + widths[2] + widths[3] + 12, 50);
  }

  
  for (let j = 0; j < cols; j++) {
    y = 45;  
    for (let i =0; i < rows; i++) {
      if (scheduled[i].type === "Form_Airline") {x, y
        y += 60;

        fill(200,200,20);
        textSize(30);
        textFont(font_1);
        textAlign(LEFT);
        // Check for departure or enroute city or arrival / scheduled city
        if (status[i].cancelled === true) {
          fill(255,0,0);
        }
        else {
          fill(235,175,5);
        }

        if (status[i].destination.city === "" || status[i].origin.city === "") {
          text("Private Charter", x, y);
        }
        else {
          if (status === departures || status === scheduled) {
            text(status[i].destination.city, x, y);text(status[i].destination.city, x, y);
          }
          else {
            text(status[i].origin.city, x, y);
          }
        }
        
        textSize(25);
        if (airlineCodes.has(status[i].airline)) {
          text(airlineCodes.get(status[i].airline), widths[0]+ x, y);
        }
        else {
          text("Unknown Airline", widths[0] + x, y);
        }
        text(status[i].ident, widths[0] + widths[1] + x, y);
        if (status === arrivals) {
          text(status[i].filed_arrival_time.time, widths[0] + widths[1] + widths[2] + x, y);
          text(status[i].actual_arrival_time.time, widths[0] + widths[1] + widths[2] + widths[3] + x, y);
        }
        else {
          text(status[i].filed_departure_time.time, widths[0] + widths[1] + widths[2] + x, y);
          text(status[i].actual_departure_time.time, widths[0] + widths[1] + widths[2] + widths[3] + x, y);
        }

        text(status[i].status, widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + x , y);
      }
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++ ) {
    for (let x = 0; x < cols; x++) {
      let startingX = 0;
      let i = 0;
      while (i < x) {
        startingX += widths[i];
        i++;
      }
      noFill();
      rect (startingX, y*cellSize, widths[x], height / rows);
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

function setupCityMenu() {
  dropdown = createSelect();
  dropdown.position(width-350, 300);
  dropdown.size(125,35)
  dropdown.option('Saskatoon');
  dropdown.option('Toronto');
  dropdown.option('Regina');
  dropdown.option('Calgary');
  dropdown.option('Vancouver');
  dropdown.option('Montreal');
  dropdown.option('Los Angeles');
  dropdown.option('New York (JFK)');
  dropdown.option('Chicago');
  dropdown.option('London');
  dropdown.option('Paris');
  dropdown.option('Dubai');
  dropdown.option('Sydney');

  dropdown.changed(mySelectEvent);
}
function mySelectEvent() {
  let item = dropdown.value();
  if (item === "Saskatoon") {
    info = cyxe;
  }
  else if (item === "Toronto") {
    info = cyyz;
  }
  else if (item === "Regina") {
    info = cyqr;
  }
  else if (item === "Calgary") {
    info = cyyc;
  }
  else if (item === "Vancouver") {
    info = cyvr;
  }
  else if (item === "Montreal") {
    info = cyul;
  }
  else if (item === "Los Angeles") {
    info = klax;
  }
  else if (item === "New York (JFK)") {
    info = kjfk;
  }
  else if (item === "Chicago") {
    info = kord;
  }
  
  else if (item === "London") {
    info = egll;
  }
  else if (item === "Paris") {
    info = lfpg;
  }
  else if (item === "Dubai") {
    info = omdb;
  }
  else if (item === "Sydney") {
    info = yssy;
  }
  
  redraw();

}

function drawButtons() {

  let col = color(255, 0, 0, 10);
  scheduledButton = createButton('Scheduled');
  departureButton = createButton('Departures');
  arrivalButton = createButton('Arrivals');

  scheduledButton.position (width - 500, height-200);
  departureButton.position (width - 300, height-200);
  arrivalButton.position (width - 100, height-200);

  scheduledButton.style('#ff00ff', col);
  


  scheduledButton.mousePressed(scheduledState);
  departureButton.mousePressed(departureState);
  arrivalButton.mousePressed(arrivalState);
}

function scheduledState() {
  state = 1;
  loop();
}
function departureState() {
  state = 2;
  loop();
}
function arrivalState() {
  state = 3;
  loop();
}