"use strict";

class Egg {
  constructor(world, x,y , dna) {
    this.world = world;
    this.world.addEgg(this);
    this.pos = createVector(x,y);
    this.color = color(220, 230, 200);
    this.age = 0;
  }



  draw() {
    stroke(this.color);
    fill(this.color);
    circle(this.pos.x, this.pos.y, 10);
  }

  update() {
    this.age++;

  }

  hatch() {

  }

  die() {
    this.world.removeEgg(this);
  }
}