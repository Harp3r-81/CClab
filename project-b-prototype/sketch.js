let p=[]
let n=20

function setup() {
  createCanvas(800, 500);
  
  for (let i = 0; i<n; i++){
    p[i] = new Particle(random(width), random(height));
    //p.push(new Particle(random(width), random(height)));
  }

}

function draw() {
  background(220);
  
  // if (mouseIsPressed) {
  //   p.push(new Particle(mouseX, mouseY));
  // }
let  breathe = map(p.length, 0,n,0.1,0.7)
let  sh = map(p.length, 0,n, 13,18)
  noStroke()
  circle(width/2,height/2*1.1,100)
  rectMode(CENTER)
  rect(width/2,height/2*1.3,30,50)
  push()
  fill(200)
  ellipse(width/2,height+5,130,340+19*sin(frameCount*breathe))
  pop()
  
  for (let i = 0; i < p.length; i++) {
    p[i].drawParticle();
    p[i].moveAway();
     if (p[i].isDone){
      p.splice(i,1);
          }

  }
console.log(breathe)
  
}

class Particle{
  constructor(x, y){
    //variables
  this.x = x; 
  this.y = y;
  this.accX = 0; 
  this.accY = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.away = 0.2; //change this to make it go further
  this.isDone = false
  this.r = random(10, 30); 
    
  }
  drawParticle(){
    circle(this.x, this.y, this.r);
  }
  moveAway(){
    let d = dist(mouseX, mouseY, this.x, this.y);
  //establish condition
  if (d < 25) { //radius of the circle
    this.accX = (mouseX - this.x) * -this.away;
    this.accY = (mouseY - this.y) * -this.away;
    this.speedX += this.accX;
    this.speedY += this.accY;
  } 
  //update speed
  this.speedX = this.speedX * 0.9; // 10% less per frame
  this.speedY = this.speedY * 0.9; // 10% less per frame
  //update position
  this.x += this.speedX;
  this.y += this.speedY;
    
    
     if (this.x < -10 || this.x > width + 10 || this.y < -10 || this.y > height + 10) {
      this.isDone = true;
    }
    
  }
  

}