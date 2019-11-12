//variables, map and options
var yourPosition;
var myMap;
var canvas;
var pointer;

var mappa = new Mappa('MapboxGL',
  'pk.eyJ1IjoibGRnZWUiLCJhIjoiY2sydnBoYWEwMDZ6eDNocGo3N2g3bXpodSJ9.cr3MMv2amQpNRbwAxuM33Q');

var options = {
  lat: 0,
  lng: 0,
  zoom: 11,
  studio: true,
  style: 'mapbox://styles/ldgee/ck2vq1hhi05gi1clfx8zgj0ol'
}

//poli coordinates
var poliLat = 45.5069296;
var poliLng = 9.1643249;

function preload() {
  position = getCurrentPosition();
  pointer = loadImage("./assets/pointer.png");
}

function setup() {
  intervalCurrentPosition(showPosition, 1);

  options.lat = position.latitude;
  options.lng = position.longitude;

  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

//paragraphs
var title = createP("‼ absolutely useless friendly reminder: you are here. ")
    .id("title");

  var latitude = createP("latitude")
    .id("lat");

  var longitude = createP("longitude")
    .id("lon");

}

function draw() {
  clear();

  //distnce between the two positions
  var poliDist = calcGeoDistance(position.latitude, position.longitude, poliLat, poliLng, "km");

  //markers
  //user marker
  var point = myMap.latLngToPixel(position.latitude, position.longitude);
  fill(230, 100, 0, 80);
  noStroke();
  ellipse(point.x, point.y, frameCount / 2);
  fill(230, 100, 0);
  ellipse(point.x, point.y, frameCount / 4);
  imageMode(CENTER);
  image(pointer, point.x, point.y - 15, 30, 30);
  if (frameCount >= 100) {
    frameCount = -frameCount;
  }

  //poli marker
  var poliPosition = myMap.latLngToPixel(poliLat, poliLng);
  fill(230, 100, 0, 80);
  noStroke();
  ellipse(poliPosition.x, poliPosition.y, frameCount / 2);
  fill(230, 100, 0);
  ellipse(poliPosition.x, poliPosition.y, frameCount / 4);
  imageMode(CENTER);
  image(pointer, poliPosition.x, poliPosition.y - 15, 30, 30);
  if (frameCount >= 100) {
    frameCount = -frameCount;
  }

  //connector between the two positions
  strokeWeight(1);
  stroke(230, 100, 0);
  line(point.x, point.y, poliPosition.x, poliPosition.y);

  //positions texts
  textFont("Courier");
  textAlign(CENTER);
  textSize(24);
  text("you", point.x, point.y + 50);
  text("B10", poliPosition.x, poliPosition.y + 50);


  //distance text displayed - if you are nearby the CC class another message will display
  textSize(25);
  textAlign(RIGHT);

  if (poliDist > 0.1) {
    text("There are " + Math.round(poliDist) + " km between you and the fantastic CC class...", windowWidth - 48, windowHeight - 248);
  } else {
    text("seems that you already are in the fantastic CC class! ", windowWidth - 48, windowHeight - 148);
  }

}
//function to show position in the top of the page
function showPosition(position) {
  currentLat = position.latitude;
  currentLng = position.longitude;

  select("#lat").html("latitude " + currentLat);
  select("#lon").html("longitude " + currentLng);
}
