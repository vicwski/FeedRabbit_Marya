const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint
const Body = Matter.Body
const Composites = Matter.Composites
const Composite = Matter.Composite

let engine
let world
var rope, fruit, ground
var fruit_con
var fruit_con_2

var bg_img
var food
var rabbit

var button, muteBtn, airBtn
var bunny
var blink, eat, sad
var bkSound, airSound, eatSound, sadSound, cutSound
var canW, canH

function preload() {
  bg_img = loadImage('images/background.png')
  food = loadImage('images/melon.png')
  rabbit = loadImage('images/rabbit.png')

  cutSound = loadSound('sounds/cutSound.mp3')
  airSound = loadSound('sounds/air.wav')
  eatSound = loadSound('sounds/eating_sound.mp3')
  sadSound = loadSound('sounds/sad.wav')
  bkSound = loadSound('sounds/sound1.mp3')

  blink = loadAnimation(
    'images/blink_1.png',
    'images/blink_2.png',
    'images/blink_3.png'
  )
  eat = loadAnimation(
    'images/eat_0.png',
    'images/eat_1.png',
    'images/eat_2.png',
    'images/eat_3.png',
    'images/eat_4.png'
  )
  sad = loadAnimation(
    'images/sad_1.png',
    'images/sad_2.png',
    'images/sad_3.png'
  )

  blink.playing = true
  eat.playing = true
  sad.playing = true
  sad.looping = false
  eat.looping = false
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  
  if (isMobile) {
    canW = displayWidth
    canH = displayHeight
  } else {
    canW = windowWidth
    canH = windowHeight
  }
  
  createCanvas(canW, canH)
  frameRate(80)

  engine = Engine.create()
  world = engine.world

  bkSound.play()
  bkSound.setVolume(0.5)
  
  button = createImg('images/cut_btn.png')
  button.position(canW / 2 - 30, 30)
  button.size(50, 50)
  button.mouseClicked(drop)

  muteBtn = createImg('images/mute.png')
  muteBtn.position(canW - 70, 10)
  muteBtn.size(50, 50)
  muteBtn.mouseClicked(mute)

  airSound = createImg('images/cut_button.png')
  airSound.position(50, 250)
  airSound.size(50, 50)
  airSound.mouseClicked(blow)

  rope = new Rope(7, { x: canW / 2 - 5, y: 30 })
  ground = new Ground(canW / 2, canH - 10, canW, 20)

  blink.frameDelay = 20
  eat.frameDelay = 20
  sad.frameDelay = 20

  bunny = createSprite(canW / 2 - 30, canH - 90, 100, 100)
  bunny.scale = 0.2

  bunny.addAnimation('blinking', blink)
  bunny.addAnimation('eating', eat)
  bunny.addAnimation('crying', sad)
  bunny.changeAnimation('blinking')

  fruit = Bodies.circle(300, 300, 20)
  Matter.Composite.add(rope.body, fruit)

  fruit_con = new Link(rope, fruit)

  rectMode(CENTER)
  ellipseMode(RADIUS)
  imageMode(CENTER)
}

function draw() {
  background(51)
  image(bg_img, width / 2, height / 2, width - 10, height - 10)

  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70)
  }

  rope.show()
  Engine.update(engine)
  ground.show()

  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation('eating')
  }

  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation('crying')
  }

  drawSprites()
}

function drop() {
  rope.break()
  fruit_con.detach()
  fruit_con = null
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    )
    if (d <= 80) {
      World.remove(engine.world, fruit)
      fruit = null
      return true
    } else {
      return false
    }
  }
}

function mute() {
  if (bkSound.isPlaying()) {
    bkSound.stop()
  } else {
    bkSound.play()
  }
}

function blow() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 })
}
