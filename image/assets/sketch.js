let backsound;
let sounds =[]
let x=[]
let y=[]
let s=20
function preload(){
backsound = loadSound("my-sounds/00.mp3")
for (let i=1;i<9;i++){
  sounds.push(loadSound("my-sounds/0"+i+".mp3"))
}
}

function setup() {
  createCanvas(400, 400);
}

function drawCircle(u,v){  
  circle(u,v,50)
}

function mousePressed(){
  x.push(mouseX)
  y.push(mouseY)
  let index = [x.length-1]%sounds.length;
  sounds[index].play();

}

function draw() {
  background(220);
  for(let i=0; i<x.length;i++) {
drawCircle(x[i],y[i])
  }
  backsound.play()
  // if(sound.isPlaying()==false && mouseIsPressed){
  //   sound.play()
  // }

    
  
}
