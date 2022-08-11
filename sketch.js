const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint
const Body = Matter.Body
const Composites = Matter.Composites
const Composite = Matter.Composite

var engine, world
var ground, fruit, rope, rabbit
var fruit_con
var bkImg, fruitImg, rabbitImg

function preload() {
  bkImg = loadImage('images/background.png')
}

function setup() {
  createCanvas(500, 700)
  frameRate(80)
  engine = Engine.create()
  world = engine.world

  ground = new Ground(200, 680, 600, 20)

  rope = new Rope(7, { x: 245, y: 30 })

  fruit = Bodies.circle(300, 300, 20)

  Matter.Composite.add(rope.body, fruit)

  fruit_con = new Link(rope, fruit)

  rabbit = createSprite(250, 600, 20, 50)

  rectMode(CENTER)
  ellipseMode(RADIUS)
  textSize(50)
}

function draw() {
  background(bkImg)

  Engine.update(engine)

  ellipse(fruit.position.x, fruit.position.y, 30, 30)

  ground.show()

  rope.show()

  drawSprites()
}
