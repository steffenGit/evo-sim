"use strict";

const RADIUS_TO_ENERGY_COST = 1;
const TARGETS_TO_ENERGY_MULTIPLIER = 0;

let COLOR_RED;
let COLOR_WHITE;

class Sensor {
  constructor(creature) {
    this.parent = creature;
    this.pos = this.parent.pos;
    this.body = creature.body;
    this.dna = this.parent.dna;
    this.world = this.parent.world;
    this.color = COLOR_WHITE;
    this.initTraits();
    COLOR_RED = color(220, 10, 10);
    COLOR_WHITE = color(250, 230, 255);
  }

  initTraits() {
    this.radius = this.dna.getGene('sensorRadius').value;
  }

  sense() {
    let creatures = this.world.senseCreatures(this.pos, this.radius);
    let plants = this.world.sensePlants(this.pos, this.radius);
    if(plants.length > 0) {
      this.color = COLOR_RED;
      //console.log(plants);
    }
    else {
      this.color = COLOR_WHITE;
    }

    creatures.sort((a,b) => {
      let da = p5.Vector.sub(this.pos,a).magSq();
      let db = p5.Vector.sub(this.pos,b).magSq();
      return da - db;
    });

    plants.sort((a,b) => {
      let da = p5.Vector.sub(this.pos,a).magSq();
      let db = p5.Vector.sub(this.pos,b).magSq();
      return da - db;
    });

    return {creatures, plants};
  }

  draw() {
    stroke(this.color);
    noFill();
    circle(this.pos.x, this.pos.y, this.radius*2);
  }
}




