let sound;
let x;
let speedX = 5;
let mic;
let s = 50;
function setup(){
  createCanvas(400,400);
  mic = new p5.AudioIn(); 
  mic.start();
  sound.play();
  sound1.play()
  x = s/2;
}

function preload(){
sound = loadSound("sounds/kick.mp3")
sound1 = loadSound("sounds/beat.mp3")
}

function draw() {
  background(220);
  let level = mic.getlevel()
  let f = map(level,0,1,0,10);
  text(level,width/2,height/2);

  fill(0);
  circle(x,height/2,50)
  x += speedX*f;
  if(x<s/2){
    speedX = -speedX;
    //sound.play();
  }
  if(x>width-s/2){
    speedX = -speedX;
    //sound1.play()
  }
}

function mousePressed(){
  if(sound.isPlaying()==false){
  sound.play();
  sound1.play()
  }else{
    sound.pause();
    sound1.pause();
  }
}