//variables
let k, x, y, newX, newY;
function setup() {
  createCanvas(400, 400);
  //declaration of variables
  k = "type something!";
  x = random(width);
  y = random(height);
  newX = random(width);
  newY = random(height);
}

function draw() {
  background(220);
  drawKey();
  moveKey();
}
function keyPressed() {
  //this will only happen once when we press a key
  changeKey(key);
}

function drawKey() {
  textSize(30);
  textAlign(CENTER);
  text(k, x, y);
}
function moveKey(){
  x = lerp(x, newX, 0.1);
  y = lerp(y, newY, 0.1);
}
function changeKey(newKey) {
  k = newKey;
  newX = random(width);
  newY = random(height);
}
