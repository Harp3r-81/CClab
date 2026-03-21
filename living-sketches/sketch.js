let scanned = [];
let planet;

let doodles2;

let curP = 0;
let curDoodle2 = 0;

function preload() {
  for (let i = 1; i <= 3; i++) {
    scanned.push(loadImage("20260320102627-" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800,800);

  eraseBg(scanned, 10);
  planet = crop(scanned, 0, 20, 585, 356);
  doodles2 = crop(scanned, 1300, 2000, 1000, 1300);
}

function draw() {
  background(255);

  push()

translate (width/2 ,
    height/2)
    imageMode(CENTER);
rotate(0.1*cos(frameCount*0.1))
  image(
    planet[curP],
    0,0,
    planet[0].width * 1,
    planet[0].height * 1
  );
  pop()

  if (mouseX < width/3){
curP = 0
  }
  else if(mouseX>width/3 && mouseX < 2*width/3){
    curP = 1
  }
  else{
    curP = 2
  }
    


 push()
translate(300,300)
 imageMode(CENTER)
 rotate(PI)
  image(
    doodles2[curDoodle2],
    200+200*cos(frameCount*0.01),200+150*sin(frameCount*0.01),
    doodles2[0].width * 0.5,
    doodles2[0].height * 0.5
  );
 pop()

  
  let d = dist(200+200*cos(frameCount*0.01),200+150*sin(frameCount*0.01), width/2,height/2);
  if (d < 300) {
    curDoodle2 = floor(map(sin(frameCount / 5), -1, 1, 0, doodles2.length));
  }

}

// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
