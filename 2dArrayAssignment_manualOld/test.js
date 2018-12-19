let airlines;
let airlineCodes = new Map ();




function preload() {
    airlines = loadStrings("assets/AirlineCodes.txt")
}

function setup() {
    setMeUp();
}

function draw() {


}

function setMeUp() {
    for (let i =0; i < airlines.length; i ++) {
        let airCode = airlines[i].split(" ")[0];
        let airlineName = airlines[i].substr(4, );


        airlineCodes.set(airCode, airlineName);

    }
}
