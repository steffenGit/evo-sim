"use strict";

class Plant {
  constructor(world, x,y , mass) {
    this.world = world;
    this.world.addPlant(this);
    this.pos = createVector(x,y);
    this.mass = mass;
    this.color = color(20, 230, 65);
  }

  update() {
    this.mass++;
  }

  getRadius() {
    return this.mass/20;
  }

  draw() {
    stroke(this.color);
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.mass / 10);
  }

  takeBite(biteSize) {
    this.mass -= biteSize;
    if (this.mass < 0) {
      this.die();
      return -this.mass;
    }
    return biteSize;
  }

  die() {
    this.world.removePlant(this);
  }
}