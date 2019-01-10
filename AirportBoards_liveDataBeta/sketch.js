// Live Flight Boards - 2d Grid Assignment
// Asir Ratnani
// November 13, 2018
//
// Extra for Experts:
// The 2d Array is used in this project by representing many different flight queries. See below for detailed example.
//
// I used an API from Flight Aware in order to create a departures/arrivals board that shows live feed.
// This was extremely difficult to acheive as I had to use not only an API and use the references from there, but i also had to implement JQuery in my index.html file.
// I am hoping to use this for my Major Project in some way.
//
// NEED TO FIX:
// Try to stray away from JQuery or figure out a way to hid the username and API key or it is potentially a security threat.
// Trying to get scheduled, arrivals, and departure info all at once without duplicating flightXML. 
// Creating multiple boards is still in progress.


let username = "ARatnani";
let apiKey = "fc2a7d607c39780ddb797b27a76572a79d82ff12";
let baseFxmlUrl = "https://" + username + ":" + apiKey +"@flightxml.flightaware.com/json/FlightXML3/";


let widths = [425,200,175,125,125,250];
let airlineCodes = new Map ();
let rows = 15;
let cols = 6;
let x,y;
let cellSize;
let typeOfFlight;
let state = 1;
let status;
let font_1, font_2, font_3;
let flightInfo;
let counter;
let airport_name;
let flight_cancelled;
let flight_type;
let departures;
let airport_code = "CYXE";

let input, button, greeting;

let info = [];

// Parameters that are sent to the API
let requestOptions = {
  "airport_code": "CYXE",
  "howMany": 15,
  "offset": 0,
  "filter": "airline"
};


function preload() {
// load fonts and json data before setup is called.
  // inputAirportCode();
  loadFlightXML();

  font_1 = loadFont("assets/open-24-display/Open 24 Display St.ttf");
  font_2 = loadFont("assets/famirids/Famirids..ttf");
  font_3 = loadFont("assets/digital-dream/DigitalDream.ttf");
  
}
//Must work on this - Trying to get user input for airport code.
function inputAirportCode () {
  input = createInput();
  input.position(700, 400 + 150);

  button = createButton("submit");
  button.position(input.x+input.width, height/2 + 150);
  button.mousePressed(greet);

  greeting = createElement("h2", "Enter in an Airport Code");
  greeting.position(width-100, height /2 + 90);

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  

  //Set up grid var's
  cellSize = height / rows;
  x = 10;
  y = 45;
  counter = 0;

  // Used a map to set airline codes with their respected names.
  airlineCodes.set("ACA", "Air Canada");
  airlineCodes.set("JZA", "Air Canada Jazz");
  airlineCodes.set("WJA", "WestJet");
  airlineCodes.set("WEN", "Westjet Encore");
  airlineCodes.set("SKW", "Delta");
  airlineCodes.set("DAL", "Delta");
  airlineCodes.set("EDV", "Delta");
  airlineCodes.set("CJT", "CargoJet");
  airlineCodes.set("SWG", "Sunwing");
  airlineCodes.set("SLQ", "Express Air");
  airlineCodes.set("WEW", "Transwest Air");
  airlineCodes.set("SLG", "Transwest Air");

 
 
}

function draw() {
 
  background(20);
  textSize(20);
  fill(255);
  determineState();
  displayGrid();
  displayJSON();
  noLoop();
}



// Component of user input function created above. See (inputAirportCode);
function greet() {
  airport_code = input.value();
  input.value = "";
}
// Loads live json data from FlightAware. Excruciatingly painful to use -.-

function loadFlightXML() {
  //Used JQuery (see index.html) to show live data.
  $.ajax({
    url: baseFxmlUrl + "AirportBoards",
    data: requestOptions,
    method: "GET",
    jsonp: "jsonp_callback",
    dataType: "jsonp",
    success: function(data, txtStatus, xhr) {
      if (data.error) {
        alert("Failed to fetch airport boards for: " + airport_code + data.error);
        return;
      }
      //Set the airport name
      airport_name = data.AirportBoardsResult.airport_info.name;
      // Recieving data from FlightAware Departures
      data.AirportBoardsResult.departures.flights.some(flight => {
        // Display basic information about the flight
        // if the flight type is a formal airline let flight type = true;
        if (flight.type === "Form_Airline") {
          flight_type = true;
        }
        else {
          flight_type = false;
        }
        // Used a 2d Array to organize each query by its own characteristics. (ex. Westjet, 323, From Saskatoon, To: Toronto,... would be all one array and the next flight would be a seperate array.)
        info.push([]);
      
        if(flight.origin.city === "" || flight.destination.city === "") {
          info[counter].push("Private Charter");
        }
        else {
          info[counter].push(flight.origin.city);
          info[counter].push(flight.destination.city);
        }

        info[counter].push(flight.ident);
        info[counter].push(flight.airline);
        
        info[counter].push(flight.filed_departure_time.time);
        info[counter].push(flight.actual_departure_time.time);
        info[counter].push(flight.status);

        counter++;
        return;
    
      });
      
    
    },
    error: function(data, text) {
      alert("Failed to decode route: " + data);
    }
  });
}
//Used to determine state and change accordingly. Ex. Departure state, Arrival state, etc.
function determineState() {
  if (state === 2) {
    // info = scheduled;
    fill(255);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(airport_name + " Airport", 1500, height / 2 - 75);
    text("Scheduled Flights", 1500, height/2);

    fill(200);
    textFont(font_3);
    textSize(28);
    textAlign(CENTER);
    text("SCHEDULED", 170, 40);
  }

  else if (state === 1) {
    // info = departures;

    fill(255);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(airport_name + " Airport", 1500, height / 2 - 75);
    text("Departed Flights", 1500, height/2);

    fill(200);
    textFont(font_3);
    textSize(28);
    textAlign(CENTER);
    text("DEPARTED", 170, 40);
  }
  else if (state === 3) {
    // info = arrivals;

    fill(255);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(airport_name + " Airport", 1500, height / 2 - 75);
    text("Arrived Flights", 1500, height/2);

    fill(200);
    textFont(font_3);
    textSize(28);
    textAlign(CENTER);
    text("ARRIVALS", 170, 40);
  }
  
}

// This function is comprised of many parts please read the comments to help you understand :)
function displayJSON() {
  //Setting the headers for the flight board.
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

  //If the flight type is a formal airline, proceed, else ignore it.
  if (flight_type){
    for (let j = 0; j < cols; j++) {
      y = 45;  
      for (let i =0; i < rows; i++) {
        y += 53;
        fill(200,200,20);
        textSize(30);
        textFont(font_1);
        textAlign(LEFT);
        // display query 1 - destination city. (i = query #, 1 = Destination City)
        text(info[i][1], x ,y);

        textSize(25);
        // If the airline code is in the Map, use it, otherwise it is an unknown airline. (i = query #, 3 = Airline)
        if (airlineCodes.has(info[i][3])) {
          text(airlineCodes.get(info[i][3]), widths[0] + x, y);
        }
        else {
          text("Unknown Airline", widths[0] + x, y);
        }
        //Display info. (0 = Origin City, 1 = Destination City, 2 = Flight Number, 3 = Airline, 4 = Est. Departure Time, 5 = Actual Departure Time, 6 = Status)
        text(info[i][2], widths[0] + widths[1] + x, y);
        text(info[i][4], widths[0] + widths[1] + widths[2] + x, y);
        text(info[i][5], widths[0] + widths[1] + widths[2] + widths[3] + x, y);
        text(info[i][6], widths[0] + widths[1] + widths[2] + widths[3] + widths[4] + x , y);
      }
    }
  }
}

//Display the grid by using rects and specified widths.
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



// This is to be used once scheduled, arrivals, and departures can all work together :)

  function mouseClicked() {
    loop();
    requestOptions.airport_code = "CYQR";

    for (let i = 0; i < 15; i ++) {
      info.pop();
    }
    loadFlightXML();
    noLoop();

    // loop();
    // if (state === 1) {
    //   state = 2;
    // }
    // else if(state === 2) {
    //   state = 3;
    // }
    // else if (state === 3) {
    //   state = 1;
    // }
    // else if (state === 4) {
    //   state = 1;
    // }
  }