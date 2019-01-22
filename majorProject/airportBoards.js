// Major Project - Airport Boards (Manual)
// Asir Ratnani
// December 11, 2018
//


//Check state to see if flights are scheduled, departed, or arrived.

// If airportState = 1; Flights are scheduled.
// If airportState = 2; Flights are departed.
// If airportState = 3; Flights are arrived.

function determineState() {
  if (airportState === 1) {
    status = scheduled;
    fill(0, 225, 60);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(info.AirportBoardsResult.airport_info.name + " Airport", width - 275, height / 2);
    text("Scheduled Flights", width - 275, height/2 + 55);

    fill(200);
    textFont(font_2);
    textSize(28);
    textAlign(CENTER);
    text("SCHEDULED", 170, 40);
  }

  else if (airportState === 2) {
    status = departures;

    fill(0, 255, 60);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(info.AirportBoardsResult.airport_info.name + " Airport", width - 275, height / 2);
    text("Departed Flights", width - 275, height/2 + 55);

    fill(200);
    textFont(font_2);
    textSize(28);
    textAlign(CENTER);
    text("DEPARTED", 170, 40);
  }
  else if (airportState === 3) {
    status = arrivals;

    fill(0, 255, 60);
    textFont(font_1);
    textSize(35);
    textAlign(CENTER);
    text(info.AirportBoardsResult.airport_info.name + " Airport", width - 275, height / 2);
    text("Arrived Flights", width - 275, height/2 + 55);

    fill(200);
    textFont(font_2);
    textSize(28);
    textAlign(CENTER);
    text("ARRIVALS", 170, 40);
  }

}

// After setting the flights, show the flights on the grid
function displayJSON() {
  textAlign(LEFT);
  fill(200);
  textFont(font_2);
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

  // Used for loop to run through JSON file.
  for (let j = 0; j < cols; j++) {
    y = 45;  
    for (let i =0; i < rows; i++) {
      if (scheduled[i].type === "Form_Airline") {x, y
        y += 60;

        fill(200,200,20);
        textSize(30);
        textFont(font_1);
        textAlign(LEFT);

        // if the flight is cancelled, fill text with red, else fill normally.

        if (status[i].cancelled === true) {
          fill(255,0,0);
        }
        else {
          fill(235,175,5);
        }
        // if the city is unknown, it is known as a private charter.

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
        // If the airline is specified in the map, use it otherwise its unknown.
        textSize(25);
        if (airlineCodes.has(status[i].airline)) {
          text(airlineCodes.get(status[i].airline), widths[0]+ x, y);
        }
        else {
          text("Unknown Airline", widths[0] + x, y);
        }
        // Draw the rest of the info.
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

// Using hardcoded widths of the grid,create a grid for the flight info.
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


// Creates dropdown menu with airports
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
// Set the current airport's info.
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

// Create scheduled, departures, and arrivals buttons
function drawButtons() {

  scheduledButton = createButton('Scheduled');
  departureButton = createButton('Departures');
  arrivalButton = createButton('Arrivals');

  scheduledButton.position (width - 500, height-200);
  departureButton.position (width - 300, height-200);
  arrivalButton.position (width - 100, height-200);

  scheduledButton.mousePressed(scheduledState);
  departureButton.mousePressed(departureState);
  arrivalButton.mousePressed(arrivalState);
}

function scheduledState() {
  airportState = 1;
  loop();
}
function departureState() {
  airportState = 2;
  loop();
}
function arrivalState() {
  airportState = 3;
  loop();
}