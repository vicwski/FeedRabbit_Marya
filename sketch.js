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

var button
var bunny
var blink, eat, sad

function preload() {
  bg_img = loadImage('images/background.png')
  food = loadImage('images/melon.png')
  rabbit = loadImage('images/rabbit.png')
  blink = loadAnimation('images/blink_1.png', 'images/blink_2.png', 'images/blink_3.png')
  eat = loadAnimation(
    'images/eat_0.png',
    'images/eat_1.png',
    'images/eat_2.png',
    'images/eat_3.png',
    'images/eat_4.png'
  )
  sad = loadAnimation('images/sad_1.png', 'images/sad_2.png', 'images/sad_3.png')

  blink.playing = true
  eat.playing = true
  sad.playing = true
  sad.looping = false
  eat.looping = false
}

function setup() {
  createCanvas(500, 700)
  frameRate(80)

  engine = Engine.create()
  world = engine.world

  button = createImg('images/cut_btn.png')
  button.position(220, 30)
  button.size(50, 50)
  button.mouseClicked(drop)

  blink.frameDelay = 20
  eat.frameDelay = 20
  bunny = createSprite(230, 620, 100, 100)
  bunny.scale = 0.2

  bunny.addAnimation('blinking', blink)
  bunny.addAnimation('eating', eat)
  bunny.addAnimation('crying', sad)
  bunny.changeAnimation('blinking')

  rope = new Rope(7, { x: 245, y: 30 })
  ground = new Ground(200, 690, 600, 20)

  fruit = Bodies.circle(300, 300, 20)
  Matter.Composite.add(rope.body, fruit)

  fruit_con = new Link(rope, fruit)

  rectMode(CENTER)
  ellipseMode(RADIUS)
  imageMode(CENTER)
}

function draw() {
  background(51)
  image(bg_img, width / 2, height / 2, 490, 690)

  image(food, fruit.position.x, fruit.position.y, 70, 70)

  rope.show()
  Engine.update(engine)
  ground.show()

  drawSprites()
}

function drop() {
  rope.break()
  fruit_con.detach()
  fruit_con = null
}
