/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:
 
  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/
 
let dancer;
 
function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
 
  // ...except to adjust the dancer's name on the next line:
  dancer = new HarpersDancer(width / 2, height / 2);
}
 
function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only
 
  dancer.update();
  dancer.display();
}
 
// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class HarpersDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    
    
    this.angle = 0;          
        
    this.wingC = color(255, 100, 200, 200); 
    this.bodyC = color(237, 199, 145)              
  }

  update() {
    
    this.angle =map(sin(frameCount*0.01),-1,1,-PI/4,PI/4);
    this.angle1 =map(sin(frameCount*0.1),-1,1,-PI/8,PI/8);
    this.width=200*sin(frameCount*0.05)
   this.w2 = 100 * sin(frameCount*0.01)
    
    //this.x = startX + 20 * cos(frameCount*0.01)
    //this.y = startY +20 * sin(frameCount*0.01)
  }

  display() {
   
// push();
// translate(this.x+this.width, this.y);
// for(let i = 20; i<=40; i+=10){

// circle(0- 100 * cos(frameCount *0.05),0-80 * sin(frameCount*0.05) ,20)
// ellipse(0,0,20,40)
// }
noStroke()
push()
translate(this.x+20 * cos(frameCount*0.1),this.y+20 * sin(frameCount*0.1))

rotate(this.angle)
fill(250)
arc(90,-20,100,80,this.angle1,PI,CHORD)
scale(-1,1)
arc(90,-20,100,80,this.angle1,PI,CHORD)
fill(200)
circle(0,0,100)
pop()

push()
strokeWeight(50)
stroke(100)
line(this.x+20 * cos(frameCount*0.1),this.y+20 * sin(frameCount*0.1),
this.x-this.w2 * cos(frameCount*0.1),this.y-this.w2 * sin(frameCount*0.1))
pop()

push()
noStroke()
fill(200)
translate(this.x-this.w2 * cos(frameCount*0.1),this.y-this.w2 * sin(frameCount*0.1))
circle(0,0,60)
fill(252, 205, 48)
beginShape()
vertex(20,20)
vertex(-20,20)
vertex(0,40)
endShape()
fill(255)
circle(-15,0,20)
circle(15,0,20)
fill(0)
circle(-15,0,10)
circle(15,0,10)
stroke(0)
strokeWeight(3)
noFill()
arc(-15,-10,20,20,PI+PI/4,PI+PI/2)
scale(-1,1)
arc(-15,-10,20,20,PI+PI/4,PI+PI/2)
pop()
//     push();
//     translate(this.x+this.width, this.y+this.w2);

//   let swing = map(sin(this.angle), -1, 1, 0.2, 1.0);

  
   
//     noStroke();
//     fill(this.wingC);

  
//     push();
//     scale(swing, 0.5); 
//     ellipse(-30, -10, 50, 80); 
//     ellipse(-25, 20, 40, 60);  
    
// //scale(swing, 1.0);
//     ellipse(30, -10, 50, 80);
//     ellipse(25, 20, 40, 60);
//     pop();

//     push()
//     fill(this.bodyC);
//     rotate(0.1*sin(frameCount*0.1))
//  ellipse(0, 0, 15, 60);
//     stroke(this.bodyC)
//     strokeWeight(2);
  
//   noFill();
//     line(0, -25, -15,-45);
//     line(0, -25, 15,-45)

//     pop()

//    fill(255, 255,255, 150);
//     noStroke();
//     circle(-30 * swing,-15, 10)
//     circle(30 * swing, -15, 10);


//     pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}
 
/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 
 
RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
 