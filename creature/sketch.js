let sep = 23;
let offr = 0;
let d1 = 50;
let speed;
let a, b;
let t;
let MS = 0.005;
let Ms = 0.003;
function setup() {
  let canvas = createCanvas(800, 500);
  //canvas.parent("p5-canvas-container");
  x = width / 2;
  y = height / 2;
  a = random(width);
  b = random(height);
}
function draw() {
  background(20, 21, 66);
  fill(4, 8, 89, 200);
  //stroke(20, 21, 400);
  noStroke()
  circle(400, 250, 370);
  push();
  for (let circ = 400; circ < 1000; circ += 40) {
    noFill();
    colorc = map(circ, 400, 1000, 150, 66);
    stroke(20, 21, colorc);
    strokeWeight(15);
    circle(width / 2, height / 2, circ);
  }

  pop();
  push();

  stroke(255);
  //飞蛾位置 location of the moth
  let t = map(dist(a, b, mouseX, mouseY), 0, 400, 300, 200);

  if (mouseIsPressed == true) {
    // MS = lerp(MS, 0.01, 0.1);
    // Ms = lerp(Ms,0.006, 0.1);
   
    MS = 0.01;
    Ms = 0.006;
    smalla = 0;
    smallb = 0;
    smallc = 0;
    a = lerp(a, width * noise(frameCount * MS), 0.1);
    b = lerp(b, height * noise(frameCount * Ms), 0.1);
    R = map(sin(frameCount * 0.1), -1, 1, 10, 100);
    a1 = width / 2 + R * cos(frameCount * 0.05);
    b1 = height / 2 + R * sin(frameCount * 0.05);
    
    
    
    let t = map(dist(a, b, mouseX, mouseY), 0, 400, 300, 200);
  } else if (
    (keyIsDown(72) && keyIsDown(73)) ||
    (keyIsDown(104) && keyIsDown(105))
  ) {
    smalla = 246;
    smallb = 184;
    smallc = 255;
    a = 2 * cos(frameCount * 0.05) + lerp(a, mouseX, 0.03);
    b = 2 * sin(frameCount * 0.05) + lerp(b, mouseY, 0.03);
    let t = map(dist(a, b, mouseX, mouseY), 0, 400, 300, 200);
  }

  // else if (keyIsPressed) {
  //   if (key == "h" && key == "i") {
  //     a = 2 * cos(frameCount * 0.05) + lerp(a, mouseX, 0.03);
  //     b = 2 * sin(frameCount * 0.05) + lerp(b, mouseY, 0.03);
  //     let t = map(dist(a, b, mouseX, mouseY), 0, 400, 300, 200);
  //     smallc = 255;
  //   }
  // }
  else {
    //move when nothing happens
    MS = 0.005;
    Ms = 0.003;
    smallc = 255;
    a = lerp(a, width * noise(frameCount * MS), 0.1);
    b = lerp(b, height * noise(frameCount * Ms), 0.1);
    R = map(sin(frameCount * 0.1), -1, 1, 10, 100);
    a1 = width / 2 + R * cos(frameCount * 0.05);
    b1 = height / 2 + R * sin(frameCount * 0.05);
    let t = map(dist(a, b, mouseX, mouseY), 0, 400, 300, 200);
    smalla = 184;
    smallb = 255;
    smallc = 255;
  }
  
  if ((keyIsDown(72) && keyIsDown(73)) || (keyIsDown(104) && keyIsDown(105))) {
    fill(smalla, smallb, smallc,40);
  }
  noStroke()
  arc(width/2,height/2, 370,370,0,PI);
  

  //  Ring 背景 background
  translate(width / 2, height / 2);
  //rotate(PI)
  for (let ac = -10; ac < 10; ac += 4) {
    push();
    noFill();
    rotate(PI);
    //arc(0,ac,400+ac,400-ac,PI-PI/10+frameCount*0.01+ac,2*PI+PI/10+frameCount*0.01+ac)
    stroke(255)
    arc(0,ac,600 + ac,200,PI - PI / 10 + frameCount * 0.01 + 2*ac,2 * PI + PI / 10 + frameCount * 0.01 - ac);
    pop();
  }
  //arc(0,0,600,200,PI-PI/10+frameCount*0.01,2*PI+PI/10+frameCount*0.05)
  pop();

  dwfx = width / 2 + 100 * cos(frameCount * 0.1);
  dwfy = height / 2 + 100 * sin(frameCount * 0.1);

  if ((keyIsDown(72) && keyIsDown(73)) || (keyIsDown(104) && keyIsDown(105))) {
    fill(smalla, smallb, smallc,40);
  }
  //fill(smalla, smallb, smallc)
  arc(width / 2, height / 2, 370, 370, PI, 2 * PI);

  //卫星带
  for (let angle = 0; angle < 2 * PI; angle += PI / 20) {
    for (let r = 200; r < 250; r += sep) {
      let x = width / 2 + r * cos(angle);
      let y = height / 2 + r * sin(angle);
      //let d = dist(mouseX, mouseY, x, y);
      let d = dist(a, b, x, y);
      let tsp = map(d, 0, 800, 100, 150);
      let s = map(d * r, 0, width * width, 5, 300);
      noFill();
      stroke(255, 255, 255, tsp);
      if (noise(angle * r) < 0.5) {
        //rect(x, y, 0.5*s);
        push();
        strokeWeight(2);
        line(x - 0.5 * s, y, x, y + 0.5 * s);
        pop();
      } else {
        fill(smalla, smallb, smallc, tsp);
        // fill(184, 255, smallc, tsp);
        noStroke();
        circle(x, y, 0.7 * s);
      }
    }
  }

  //画飞蛾 draw the moth
  function spaceMoth(x, y, s) {
    //变量 variables
    let n = noise(frameCount * 0.3);
    nn = noise(frameCount);
    console.log(n);
    if (mouseIsPressed == true) {
      speed = 0.5;
    } else if (
      (keyIsDown(72) && keyIsDown(73)) ||
      (keyIsDown(104) && keyIsDown(105))
    ) {
      speed = 0.3;
    } else {
      speed = 0.1;
    }

    if (mouseIsPressed == true) {
      r = 100 + nn * 10;
      c1 = n * 10;
    } else {
      c1 = 0;
      r = 100;
    }

    //翅膀 wings
    push();
    if (mouseIsPressed == true) {
      freq = 0.9;
      stroke(255, 255, 255, t);
    } else if (
      (keyIsDown(72) && keyIsDown(73)) ||
      (keyIsDown(104) && keyIsDown(105))
    ) {
      freq = 0.1;
      stroke(255, random(200, 255), 255, t);
    } else {
      freq = 0.05;
      stroke(255, 255, 255, t);
    }
    noFill();
    strokeWeight(1);
    // stroke(255,255,255,t)
    translate(x, y);
    for (let i = 0; i < 65; i += 5) {
      let s = map(i, 0, 40, 100, 10); //smaller to bigger
      let w = map(i, 0, 40, 10, 100); //how long
      let ww = 5 * sin(frameCount * freq + i * 0.1); 
      circle(s - 100, ww, s);
      circle(w - 10, ww, s);
    }

    pop();

    //尾巴 tails
    push();
    stroke(255, 255, 255, t);
    translate(x, y);
    let s1 = 100;
    beginShape();
    let lineLength = s1 * 0.7;
    noFill();
    for (let i = lineLength; i <= 2 * lineLength; i += lineLength / 10) {
      strokeWeight(s1 * 0.05);
      let v = 0.5 * s1 * 0.1 * sin(frameCount * speed - i / (s1 * 0.1));
      vertex(v + 20, i - 30);
    }
    endShape();

    beginShape();
    noFill();
    for (let i1 = lineLength; i1 <= 2 * lineLength; i1 += lineLength / 10) {
      strokeWeight(s1 * 0.05);
      let v1 = 0.5 * s1 * 0.1 * cos(frameCount * speed - i1 / (s1 * 0.1));
      vertex(v1 - 20, i1 - 30);
    }
    endShape();
    pop();

    //飞蛾身体 body
    push();
    translate(x, y);
    fill(255, 255, 255, t);
    noStroke();
    circle(0, c1, r);
    //   let eye = map(sin(frameCount*0.1),-1,1,0.9,1,)
    //   arc(-20,0,50*eye,50,PI/4,PI,PIE)
    //   arc(20,0,50*eye,50,0,PI-PI/4)

    //eyes
    if (checkMouse() == true) {
      fill(0);
      let eye = map(sin(frameCount * 0.1), -1, 1, 0.9, 1);
      arc(-20, n * 10, 50 * eye, 50, PI / 4, PI, CHORD);
      arc(20, n * 10, 50 * eye, 50, 0, PI - PI / 4, CHORD);
    } else if (
      (keyIsDown(72) && keyIsDown(73)) ||
      (keyIsDown(104) && keyIsDown(105))
    ) {
      let color = map(sin(frameCount * 0.1), -1, 1, 180, 240);
      fill(255, color, 255);
      let eye = map(sin(frameCount * 0.02), -1, 1, 0.8, 1.05);
      arc(-20, n * 10, 50 * eye, 50 * eye, PI / 4, PI);
      arc(20, n * 10, 50 * eye, 50 * eye, 0, PI - PI / 4);
    } else {
      fill(200, 200, 200, t);
      let eye = map(sin(frameCount * 0.1), -1, 1, 0.9, 1);
      arc(-20, 0, 50 * eye, 50, PI / 4, PI);
      arc(20, 0, 50 * eye, 50, 0, PI - PI / 4);
    }
    // for(let eye = 0; eye<4; eye+=1){
    //   push()
    // arc(-22,eye,50,40,PI/4,PI)
    // arc(22,eye,50,40,0,PI-PI/4)
    //   pop()
    // }
    pop();

    push();
    stroke(255, 255, 255, t);
    strokeWeight(5);
    noFill();
    translate(x, y);
    msx = map(mouseX, 0, 800, -100, -20);
    msy = map(mouseY, 0, 500, -50, 0);
    arc(60, -20, 70, 50, PI, 2 * PI - PI / 2);
    arc(-60, -20, 70, 50, PI + PI / 2, 2 * PI);
    line(-60, -45, msx, msy);
    line(60, -45, -msx, msy);

    pop();
  }
  
  spaceMoth(a, b);
  
  if(mouseIsPressed && frameCount%30<100){
    push()
    textSize(20);
    fill(200)
    textAlign(CENTER,CENTER);
    text("Say 'hi' first!", a+150, b-50);

    strokeWeight(2);
    pop()
  }
  
  
  if (keyIsPressed) {
    if (
      (keyIsDown(72) && keyIsDown(73)) ||
      (keyIsDown(104) && keyIsDown(105))) {
      noStroke();
      fill(255, 231, 112);
      circle(mouseX, mouseY, 20 + 2 * sin(frameCount * 0.1));
      fill(245, 56, 100);
      circle(mouseX, mouseY, 10 + 2 * sin(frameCount * 0.1));
    }
  }

  function checkMouse() {
    if (mouseIsPressed == true) {
      
      return true;
    } else {
      return false;
    }

    // for (let x1 = d1 / 2; x1 < width; x1 += d1) {
    //   for (let y1 = d1 / 2; y1 < height/4 ; y1 += d1) {
    //     // let s = d*noise(frameCount*0.01 + x*y);
    //     let di = dist(mouseX, mouseY, x1, y1);
    //     let s = map(di, 0, width, 5, d1);
    //     noFill();
    //     stroke(100);
    //     if(noise(x1*y1) > 0.5){
    //        circle(x1, y1, s);
    //     }
    //   }
    //}
  }
}