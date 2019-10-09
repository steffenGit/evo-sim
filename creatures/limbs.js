"use strict";


class Limbs {
  constructor(creature) {
    this.parent = creature;
    this.pos = this.parent.pos;
    this.dna = this.parent.dna;
    this.body = this.parent.body;

    this.direction = p5.Vector.random2D();

    this.initTraits();

  }

  initTraits() {
    this.speed = 10;
  }

  walk() {
    this.pos.add(p5.Vector.mult(this.direction, this.speed));
  }


  turn(radians) {
    this.direction.rotate(radians);
  }


  turnTo(position) {
    let dif = p5.Vector.sub(position, this.pos);
    let rad1 = this.direction.angleBetween(dif);
    this.turn(rad1);
    // TODO: fix this workaround the fact, that the angle is always positive
    let rad2 = this.direction.angleBetween(dif);
    if(rad2 > rad1) {
      this.turn(-2*rad1);
    }
    stroke(0);
  }

  update() {
  }

  draw() {
    stroke(0);
    let x = this.pos.x;
    let y = this.pos.y;

    let longDir = p5.Vector.mult(this.direction, 50);
    let x2 = this.pos.x + longDir.x;
    let y2 = this.pos.y + longDir.y;
    line(x, y, x2, y2);
  }

}


