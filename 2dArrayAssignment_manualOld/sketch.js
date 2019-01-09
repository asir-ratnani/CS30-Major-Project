// Major Project - Airport Boards (Manual)
// Asir Ratnani
// December 11, 2018
//
// Extra for Experts:
// 

let widths = [425,200,175,125,125,250];
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


// Ignore the following code, this is to be used for pulling live data from FlightAware.
// httpGet("http://flightxml.flightaware.com/json/FlightXML3/METHODNAME");
// httpDo("http://flightxml.flightaware.com/json/FlightXML3/METHODNAME", [method], [data], [datatype], [callback], [errorCallback])

// WebAuthentication
// WebAuthentication
// httpGet("http://flightxml.flightaware.com/json/FlightXML3/WeatherConditions?airport_code=KJFK&weather_date=0&howMany=1&offset=0");

// let url = http://flightxml.flightaware.com/json/FlightXML3/METHODNAME
// Username = "********"
// API Key = "fc2a7d607c39780ddb797b27a76572a79d82ff12"
// fxmlUrl = "https://flightxml.flightaware.com/json/FlightXML3/"

// let url = 'https://flightxml.flightaware.com/json/FlightXML3/AirportBoards?airport_code=CYXE'

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
  createCanvas(1700, 900);
  setupCityMenu();
  setAirlineCodes();
  cellSize = height / rows;

  x = 10;
  y = 45;
  
  

  departures = info.AirportBoardsResult.departures.flights;
  arrivals = info.AirportBoardsResult.arrivals.flights;
  scheduled = info.AirportBoardsResult.scheduled.flights;
  enroute = info.AirportBoardsResult.enroute.flights;

  

}

function draw() {
  background(20);

  determineState();
  displayGrid();
  displayJSON();
}
function determineState() {
  if (state === 1) {
    status = scheduled;
    fill(255);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(info.AirportBoardsResult.airport_info.name + " Airport", 1500, height / 2 - 75);
    text("Scheduled Flights", 1500, height/2);

    fill(200);
    textFont(font_3);
    textSize(28);
    textAlign(CENTER);
    text("SCHEDULED", 170, 40);
  }

  else if (state === 2) {
    status = departures;

    fill(255);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(info.AirportBoardsResult.airport_info.name + " Airport", 1500, height / 2 - 75);
    text("Departed Flights", 1500, height/2);

    fill(200);
    textFont(font_3);
    textSize(28);
    textAlign(CENTER);
    text("DEPARTED", 170, 40);
  }
  else if (state === 3) {
    status = arrivals;

    fill(255);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(info.AirportBoardsResult.airport_info.name + " Airport", 1500, height / 2 - 75);
    text("Arrived Flights", 1500, height/2);

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
  text("AIRLINE", widths[0] + 10, 40);
  text("FLIGHT", widths[0] + widths[1]+ 10, 40);
  text("STATUS", widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + 10, 40);
  textSize(19);
  text("EST.TIME", widths[0] + widths[1] + widths[2] + 3, 40);
  textSize(24);
  text("ACTUAL", widths[0] + widths[1] + widths[2] + widths[3] + 10, 40);

  
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
          fill(200,200,20);
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
        text(status[i].filed_departure_time.time, widths[0] + widths[1] + widths[2] + x, y);
        text(status[i].actual_departure_time.time, widths[0] + widths[1] + widths[2] + widths[3] + x, y);

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


function mouseClicked() {
  if (state === 1) {
    state = 2;
  }
  else if(state === 2) {
    state = 3;
  }
  else if (state === 3) {
    state = 1;
  }
  // else if (state === 4) {
  //   state = 1;
  // }
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
  dropdown.position(10, 10);
  dropdown.option('Saskatoon');
  dropdown.option('Toronto');
  // dropdown.option('Regina');
  // dropdown.option('Calgary');
  // dropdown.option('Vancouver');
  // dropdown.option('Montreal');
  // dropdown.option('Los Angeles');
  // dropdown.option('New York (JFK)');
  // dropdown.option('Chicago');
  // dropdown.option('London');
  // dropdown.option('Paris');
  // dropdown.option('Dubai');
  // dropdown.option('Sydney');

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
  redraw();
}