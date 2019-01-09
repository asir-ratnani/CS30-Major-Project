// Major Project - Manual Airport Boards
// Asir Ratnani
// December 11, 2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let dropdown;

function setup() {
  textAlign(CENTER);
  background(200);
  dropdown = createSelect();
  dropdown.position(10, 10);
  dropdown.option('Saskatoon');
  dropdown.option('Toronto');
  dropdown.option('Regina');
  dropdown.changed(mySelectEvent);
}

function mySelectEvent() {
  let item = dropdown.value();
  background(200);
  text(item, 50, 50);
}