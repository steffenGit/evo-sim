"use strict";


class Creature {

  constructor(world, dna, x, y) {
    this.world = world;
    this.world.addCreature(this);
    this.dna = dna;
    x = x || Math.floor(Math.random()*width);
    y = y || Math.floor(Math.random()*height);
    this.pos = createVector(x, y);
    this.body = new Body(this);
    this.jaw = new Mouth(this);
    this.sensor = new Sensor(this);
    this.brain = new Brain(this);
    this.womb = new Womb(this);
    this.limbs = new Limbs(this);
    this.alive = true;
    this.age = 0;
  }

  get weight() {
    return this.body.getWeight();
  }

  draw() {
    this.body.draw();
    this.sensor.draw();
    this.limbs.draw();
    this.brain.draw();
  }

  copy() {
    return new Creature(world, this.dna.copy(), this.pos.x, this.pos.y);
  }

  mutate() {
    this.dna.mutate();
    this.initTraits();
  }


  getOffspring() {
    return this.copy().mutate();
  }

  die() {
    this.world.removeCreature(this);
    this.alive = false;
  }

  initTraits() {
    this.body.initTraits();
  }


  update() {
    this.age++;
    this.body.update();
    this.womb.update();
    let action = this.brain.think();

    switch (action.type) {
      case(ACTION_TYPES.WALK_TO):
        this.limbs.turnTo(action.pos);
        this.limbs.walk();
        break;
      case(ACTION_TYPES.WALK):
        this.limbs.walk();
        break;
      case(ACTION_TYPES.EAT):
        this.jaw.bite(action.food);
        break;
      default:
        console.log('should not happen');
    }
    this.body.idle();
  }
}






