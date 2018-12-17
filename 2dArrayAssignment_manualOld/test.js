let airlines;



function preload() {
    airlines = loadStrings("assets/AirlineCodes.txt")
}

function setup() {

}

function draw() {
    // airlines.split(" ");
    console.log(airlines[0]);
    console.log(airlines[1]);
    console.log(airlines[2]);
}