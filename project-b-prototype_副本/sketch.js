let handPose;
let video;
let hands = [];
let d;
let options = { maxHands: 2, flipped: false };
let breathe = 0;
let p1 = 0;
let move = 0;
let breathing;
let myCharacter;
let heavybreathe = false;
let pix = [];
let img = [];
let opa = 300
let p = [];
let initialCount = 100;
let timeCounter = 0;
function preload() {
  breathing = loadSound("assets/breathing3.wav");
  handPose = ml5.handPose(options);
  rainbow = loadSound("assets/Rainbow.mp3");
  scared = loadSound("assets/Scared.mp3");

  for (let i = 1; i < 3; i++) {
    let fileName = 'images/' + i + '.PNG';
    img.push(loadImage(fileName));
  }

}


function setup() {
  createCanvas(800, 500);
  //breathing.loop();
  video = createCapture(VIDEO);
  video.size(800, 500);
  video.hide();
  myCharacter = new Character(width / 2, height / 2);

  for (let u = 0; u < initialCount; u++) {
    p.push(new Particle(random(width), random(height)));
  }

  for (let i = 0; i < img.length; i++) {
    pix[i] = new Pix(img[i], i + 0.5);
  }


}
function draw() {
  background(0);
  if (timeCounter % 100 == 0) {
    console.log(timeCounter);
  }

  if (hands.length == 0) {
    timeCounter++;
  }
  //let bright = random(150,200)
  if (mouseIsPressed) {
    handPose.detectStart(video, gotHands);
    opa = 0
  }
  function gotHands(results) {
    hands = results;
  }

  //background(4, 19, 43);
  //drawWindow();

  for (let i = 0; i < img.length; i++) {
    pix[i].update(pix[1]);
    pix[i].display();
  }

  push();
  translate(width, 0);
  scale(-1, 1);
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    timeCounter = 0;
    let hand = hands[i];
    p1 = hand.keypoints[9];

    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      text(j, keypoint.x, keypoint.y);

      // fill(255,255,255,20);
      // noStroke();
      // ellipse(keypoint.x, keypoint.y, 20,40);
    }
  }

  bright = map(p.length, initialCount, 0, random(100, 200), 0)

  background(0, 0, 0, bright)

  for (let i = p.length - 1; i >= 0; i--) {
    p[i].drawParticle();
    p[i].moveAway(p1.x, p1.y);

    if (p[i].isDone) {
      p.splice(i, 1);
    }

    let n = map(p.length, 100, 0, 1.5, 0.3);
    breathing.rate(n);
  }

  if (mouseIsPressed) {
    heavybreathe = true;

    if (heavybreathe == true && scared.isPlaying() == false) {
      scared.play();
      breathing.loop();

    }
  }
  breathe = map(p.length, 0, initialCount, 0.1, 0.7);
  //push();

  console.log(heavybreathe);
  //let p1 = hands[9]
  pop();

  //drawCharacter();
  //drawScene()
  myCharacter.update();
  myCharacter.display();
  fill(255);
  noStroke();
  text(p.length, 20, 30);

  if (checkMusic() && rainbow.isPlaying() == false) {
    rainbow.play();
  }

  background(0, 0, 0, opa)
}

class Pix {
  constructor(pix, i) {
    this.pix = pix; //add image
    this.x = -this.pix.width / 2; //position
    this.y = 0;
    this.speedX = i; //speed for each image
  }
  display() {
    image(this.pix, this.x, this.y);
  }
  update(other) {
    //when mouse is on the right, move left
    if (p1.x > width / 2 * 1.5 && (width - other.x) < other.pix.width) {
      this.x = this.x - this.speedX;
    }
    //when mouse is on the left, move right
    if (p1.x < width / 2 * 0.5 && other.x < other.pix.width / 2 - this.pix.width / 2) {
      this.x = this.x + this.speedX;
    }

  }
}


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.away = 0.15;
    this.isDone = false;
    this.r = random(20, 40);
    this.color = 0;
    this.opacity = 0.1;
    this.sat = 10;
  }

  drawParticle() {
    push();
    colorMode(HSB);
    fill(60, this.sat, this.color, 1);
    noStroke();
    circle(this.x, this.y, this.r + 10 * sin(frameCount * 0.01));
    pop();
  }

  moveAway(ax, ay) {
    this.color = 40;
    let d = dist(ax, ay, this.x, this.y);

    if (d < 100) {
      this.speedX += (this.x - ax) * this.away * 0.1;
      this.speedY += (this.y - ay) * this.away * 0.1;
      this.color = 100 - 100 * sin(frameCount * 0.1);
      this.opacity = 0.8;
      this.sat = 100;
    }

    this.speedX *= 0.95;
    this.speedY *= 0.95;
    this.x += this.speedX;
    this.y += this.speedY;

    let margin = this.r;
    if (
      this.x < -margin ||
      this.x > width + margin ||
      this.y < -margin ||
      this.y > height + margin
    ) {
      this.isDone = true;
    }
  }
}



function drawWindow() {
  rectMode(CENTER);
  push();
  fill(20);

  rect(width / 2, height / 2, 500, 300);
  pop();
}

function checkMusic() {
  if (p.length <= 1) {
    return true;
  } else {
    return false;
  }
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.baseEye = 60;
    this.basePupil = 40;
    this.mouth = 0
  }

  update() {
    if (p.length <= 60) {
      this.currentEye = this.baseEye
      this.currentPupil = this.basePupil;
      //  this.currentEye= map(sin(frameCount),-1,1, 60, 0);
      // this.currentPupil = map(sin(frameCount),-1,1, 40, 0);
      // this.currentEye= map(p1.y,0,height, 80, 0);
      // this.currentPupil = map(p1.y, 0,height, 50, 0);
    } else if (p.length > 60 && frameCount % 20 == 0) {
      this.currentEye = map(sin(frameCount), -1, 1, 60, 0);
      this.currentPupil = map(sin(frameCount), -1, 1, 40, 0);

      //       this.currentEye = this.baseEye
      //       this.currentPupil = this.basePupil;
    }
    this.lookX = map(p1.x, width, 0, -10, 10);
    this.lookY = map(
      p1.y,
      0,
      height,
      -this.currentEye / 4,
      this.currentEye / 4
    );
    this.mouth = map(p.length, 100, 0, 0, 100)
  }

  display() {
    push();
    stroke(0);
    strokeWeight(2);
    fill(255);


    ellipse(this.x + 15, height - 20, 100, 200 + 5 * sin(frameCount * breathe));
    circle(this.x, this.y + 75, 120);

    fill(255);
    ellipse(this.x + 30, this.y + 90, 60, this.currentEye);
    ellipse(this.x - 30, this.y + 90, 60, this.currentEye);

    fill(0);
    ellipse(
      this.x + 30 + this.lookX,
      this.y + 90 + this.lookY,
      40,
      this.currentPupil
    );
    ellipse(
      this.x - 30 + this.lookX,
      this.y + 90 + this.lookY,
      40,
      this.currentPupil
    );

    noFill();
    arc(this.x - 30, this.y + 40, 40, 30, 0, PI / 2);
    arc(this.x + 30, this.y + 40, 40, 30, PI / 2, PI);
    stroke(20, 20, 20, this.mouth)
    arc(this.x, this.y + 110, 30, 30, PI / 4, PI / 2 + PI / 4);
    pop();
  }
}

