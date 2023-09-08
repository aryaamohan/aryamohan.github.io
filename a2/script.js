h = 800
w = 800

let TopInput;
let BotInput;
let radio;
let dropdown;
let Rslider;
let Gslider;
let Bslider;
let Sizeslider;
let button;
let fbutton;

let meme;
let font;

function changeimage() {
  let m1 = dropdown.value();
  meme = loadImage(m1);
}

function changefont() {
  let fchoice = radio.value();
  font = loadFont(fchoice);
}

function saveToFile() {
  saveCanvas('myMeme', 'png')
}

function setup() {
  let cnv = createCanvas(w,h);
  cnv.parent('column-two'); //sets <div id="column-two"></div> as parent container of the canvas
  
  // Text Input Elements

  let inp = createP('Input Text :');

  inp.parent('column-one');
  inp.class('text');
  inp.id('intxt');
  
  TopInput = createInput('Enter Top Tile Text')
  BotInput = createInput('Enter Bottom Tile Text')

  TopInput.parent('column-one');
  TopInput.class('inputb');
  TopInput.id('topinput');

  BotInput.parent('column-one');
  BotInput.class('inputb');
  BotInput.id('topinput');
  
  // Image Dropdown

  let ip = createP('Choose Image :');

  ip.parent('column-one');
  ip.class('text');
  ip.id('imagetxt');
  
  dropdown = createSelect();
  dropdown.option('Bro, not cool', './images/meme1.png');
  dropdown.option('Disappointed Dude', './images/meme2.png');
  dropdown.option('Crying Dude', './images/meme3.png');
  dropdown.option('Weak vs Strong Chad', './images/meme4.png');

  dropdown.parent('column-one');
  dropdown.class('dropbtn');
  
  // Button for Image

  button = createButton('Enter');
  button.mousePressed(changeimage);

  button.parent('column-one');
  button.class('btn');
  
  let m1 = dropdown.value();
  meme = loadImage(m1);
  
  // Font Radio

  let fp = createP('Choose Font :');

  fp.parent('column-one');
  fp.class('text');
  fp.id('fonttxt');
  
  radio = createRadio();
  
  radio.option('./fonts/Roboto-Regular.ttf', 'Roboto');
  radio.option('./fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf', 'Bricolage Grotesque');
  radio.option('./fonts/DancingScript-VariableFont_wght.ttf', 'Dancing Script');

  radio.parent('column-one');
  radio.class('radiobtn');
  
  // Button for Radio

  fbutton = createButton('Enter');
  fbutton.mousePressed(changefont);

  fbutton.parent('column-one');
  fbutton.class('btn');
  
  font = loadFont('./fonts/Roboto-Regular.ttf');
  
  // Font Slider

  let fp2 = createP('Change Font Size :');

  fp2.parent('column-one');
  fp2.class('text');
  fp2.id('sizetxt');

  Sizeslider = createSlider(0, 100, 36);

  Sizeslider.parent('column-one');
  Sizeslider.class('Sliders');
  Sizeslider.id('SizeS');

  
  // Color Slider

  let cp = createP('Change Font Color :');

  cp.parent('column-one');
  cp.class('text');
  cp.id('coltxt');

  Rslider = createSlider(0, 255, 30);

  Rslider.parent('column-one');
  Rslider.class('Sliders');
  Rslider.id('RSlider');

  Gslider = createSlider(0, 255, 30);

  Gslider.parent('column-one');
  Gslider.class('Sliders');
  Gslider.id('GSlider');

  Bslider = createSlider(0, 255, 30);

  Bslider.parent('column-one');
  Bslider.class('Sliders');
  Bslider.id('BSlider');

  // Save Button

  let btn2 = createButton('Save Image');
  btn2.mousePressed(saveToFile);

  btn2.parent('column-one');
  btn2.class('buttons');
}
  
function draw() {
  background(220);
  
  image(meme,0,0)
  
  stroke(color('black'))
  fill(color('white'))
  strokeWeight(15)
  
  rect(w*.75,h/2,w/2,h)
  rectMode(CENTER)
  
  line(0, h/2, w, h/2)
  
  let ttext = TopInput.value();
  let btext = BotInput.value();
  
  textFont(font)
  
  textAlign(CENTER, CENTER);
  
  let s = Sizeslider.value(); 
  textSize(s)
  
  strokeWeight()
  
  let r = Rslider.value();
  let g = Gslider.value();
  let b = Bslider.value();
  
  let c = color(r,g,b)
    
  fill(c)
  text(ttext, .75 *w, .25*h, w/2, h/2);
  text(btext, .75 *w, .75*h, w/2, h/2);
}
  
  
  