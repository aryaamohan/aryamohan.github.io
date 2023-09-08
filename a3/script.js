let w;
let h;

let c = [['#EF3E36', '#837E79', '#17BEBB', '#237373', '#294E4F',
          '#2E282A', '#8E705B', '#EDB88B', '#F4C8B1'],
         ['#000F08', '#0A3F36', '#136F63', '#7A9D50', '#E0CA3C',
          '#EA8628', '#EF641E', '#3E2F5B', '#993937'],
         ['#2274A5', '#8D6854', '#F75C03', '#F49009', '#F1C40F',
          '#E5643C', '#D90368', '#6D6867', '#00CC66']];
let wc = ['#FAD8D6', '#F34213', '#17D174'];
let bg = ['#085E41', '#50433A', '#4E213B'];

let waldo;
let cnv;
let texture;
let winsound;
let wrongsound;
let losesound;
let gamesound;

let font;

let img;
let timer = 0;
let showImage = false;
let t = 0;

let p1, p2, p3;

let shape_dropdown;
let dropdown_value;

let density_slider;
let density_value;
let circleX;
let circleY;
let circleSize;

let radio_palette;
let radio_value;

let confettiColor = [], confetti = [];
let loopstatus = 'true';

function preload() {
    texture = loadImage('./images/oilTexture.png');
    img = loadImage('./images/Jumpscare1.gif');
    winsound = loadSound('./soundfx/Confetti_Sound.mp3');
    losesound = loadSound('./soundfx/Sike.mp3');
    wrongsound = loadSound('./soundfx/Wrong.mp3');
    gamesound = loadSound('./soundfx/game.mp3');
    font = loadFont('./fonts/GothamBold.ttf')
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('main-container');
    cnv.parent('canvas');
    // Confetti Setup
    
      confettiColor = [color('#00aeef'), color('#ec008c'), color('#72c8b6')];
    for (let i = 0; i < 100; i++) {
      confetti[i] = new Confetti(random(0, width),
                                 random(-height, 0),
                                 random(-1, 1));
    }
    
    // Input Elements

    
    // p1 = createP('Dropdown for Number of Shapes :');
    // p1.parent('element-row');
    // p1.class('title');

    shape_dropdown = createSelect();
    shape_dropdown.option('Select Number of Shapes', '0');
    shape_dropdown.option('1', '0');
    shape_dropdown.option('2', '1');
    shape_dropdown.option('3', '2');
    shape_dropdown.changed(fill_shape);
    shape_dropdown.parent('column-one');
    shape_dropdown.class('dropdown');
    
    // p2 = createP('Slider for Shape Density :');
    // p2.parent('element-row');
    // p2.class('title');

    density_slider = createSlider(50,1000,250);
    density_slider.changed(fill_shape);
    density_slider.parent('column-one');
    density_slider.class('slider');

    // p3 = createP('Radio for Color Palette :');
    // p3.parent('element-row');
    // p3.class('title');

    radio_palette = createRadio();
    radio_palette.option('0','Palette 1');
    radio_palette.option('1','Palette 2');
    radio_palette.option('2','Palette 3');
    radio_palette.changed(fill_shape);
    radio_palette.selected('0');
    radio_palette.parent('column-two');
    radio_palette.class('radio');
    
}

function keyPressed() {
    if (keyCode == '13') {
      loopstatus = 'true';
      redraw();
    }
}

function fill_shape() {
    // loopstatus = 'true';
    w = windowWidth;
    h = windowHeight;
    
    let dropdown_value = shape_dropdown.value();
    let density_value = density_slider.value();
    let radio_value = radio_palette.value();
    
    redraw();
    
    function find_waldo() {
      w = windowWidth;
      h = windowHeight;
      
      let waldo_color = wc[radio_value];
      
      textFont(font);
      textSize(32);
      textAlign(CENTER);
      fill(waldo_color);
      text('Find Waldo.', w/2, h/6-40);
      text('Waldo is :', w/2, h/6);
      circle(w/2, h/6+30, 20);
      noFill();
      stroke(color(waldo_color));
      rect(w/2, h/6-15, 210, 140, 10);
      
  
      circleX = random(0.2*w,0.8*w);
      circleY = random(0.3*h,0.7*h);
      circleSize = 20
      
      noStroke();
      fill(waldo_color);
      waldo = circle(circleX, circleY, circleSize);
      redraw();
    }
    
    for (i = 1; i <= density_value; i++){
      ran_col = random(c[radio_value]);
      fill(ran_col);
      // strokeWeight(0.5);
      noStroke();
      
      if (dropdown_value == 0) {
        circle(random(0.2*w,0.8*w), random(0.3*h,0.7*h), 20);
      }
      if (dropdown_value == 1) {
        circle(random(0.2*w,0.8*w), random(0.3*h,0.7*h), 20);
        rect(random(0.2*w,0.8*w), random(0.3*h,0.7*h), 20, 20);
      }
      if (dropdown_value == 2) {
        circle(random(0.2*w,0.8*w), random(0.3*h,0.7*h), 20);
        rect(random(0.2*w,0.8*w), random(0.3*h,0.7*h), 20, 20);
        let rx = random(0.2*w,0.8*w);
        let ry = random(0.3*h,0.7*h);
        triangle(rx-10, ry, rx+10, ry, rx, ry-15);
      }
    }
    find_waldo()
}

function mouseClicked(){
  
    w = windowWidth;
    h = windowHeight;
    
    //get the distance between the mouse and the center of the circle
    var d = dist(mouseX, mouseY, circleX, circleY);
    
    var d1 = dist(mouseX, mouseY, w/2, h/2);
    
    //check to see if the distance is less than the size of the circle
    if(d < circleSize){
      winsound.play();
      loopstatus = 'false';
      redraw();
    } if (d >circleSize & d1 < h/4) {
      if (t == 3) {
        loop();
        losesound.play();
        loopstatus = 'scare';
        showImage = true;
        redraw();
        t = 0;
      } else {
        wrongsound.play()
        t ++
      }
    }
}

function bgscore() {
  if (!gamesound.isPlaying()) {
    gamesound.play();
    gamesound.loop();
  }
}

function draw() {
  
    if (loopstatus == 'scare') {
      bgscore();
      if (showImage) {
        loop();
        image(img, 0, 0, width, height);
        timer++;
  
        if (timer >= 60) { // 180 frames at 60fps = 3 seconds
          loopstatus = 'true';
          showImage = false;
          timer = 0;
          noLoop();
        }
      }
    } if (loopstatus == 'true') {
      bgscore();
      noLoop();
      w = windowWidth;
      h = windowHeight;
      let radio_value = radio_palette.value();
      let bg_color = bg[radio_value];
      background(bg_color);
  
      rectMode(CENTER);
      // rect(w/2, h/2, w/2, h/3);
  
      fill_shape();
  
      //add texture
      push();
      imageMode(CENTER);
      translate(width / 2, height / 2);
      rotate(random(360));
      tint(255, 49);
      let longSide = max(width, height);
      image(texture, 0, 0, longSide * 1.5, longSide * 1.5);
      pop();
    } if (loopstatus == 'false') {
      bgscore();
      loop();
      background(51);
  
        for (let i = 0; i < confetti.length / 2; i++) {
          textSize(32);
          textAlign(CENTER);
          fill('white');
          text('You found Waldo!', w/2, h/2);
          
          textSize(14);
          text('Press Enter to Continue.', w/2, h/2+20);

        confetti[i].confettiDisplay();
  
        if (confetti[i].y > height) {
          confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
        }
      }
  
      for (let i = int(confetti.length / 2); i < confetti.length; i++) {
        confetti[i].confettiDisplay();
  
        if (confetti[i].y > height) {
          confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
        }
      }
    } 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}