"use strict";


class Brain {
  constructor(creature) {
    this.parent = creature;
    this.pos = this.parent.pos;
    this.dna = this.parent.dna;
    this.body = this.parent.body;
    this.sensor = this.parent.sensor;
    this.jaw = this.parent.jaw;
    // this.evoBoxSize = Math.sqrt(2 * this.sensor.radius ** 2);
    this.evoBoxSize = 2 * this.sensor.radius;
    this.evoResolution = 5;
    this.evoCellSize = this.evoBoxSize / this.evoResolution;
    this.evaluations = [];
    this.currentBestEval = undefined;
    this.lastBestEval = undefined;
  }

  think() {
    let senses = this.sensor.sense();
    this.evaluateSurroundings(senses);
    let plants = senses.plants;
    let creatures = senses.creatures;

    let closestPlant = plants[0];

    if (this.pos.x > width
        || this.pos.y > height
        || this.pos.x < 0
        || this.pos.y < 0) {
      return {
        type: ACTION_TYPES.WALK_TO,
        pos: createVector(Math.random() * width, Math.random() * height)
      };
    }


    if (closestPlant && p5.Vector.sub(this.pos, closestPlant.pos).mag() < this.jaw.jawRadius) {
      console.log('eat');
      return {
        type: ACTION_TYPES.EAT,
        food: closestPlant,
      };
    } else if(this.lastBestEval && this.currentBestEval.value !== this.lastBestEval.value){
      let x = this.currentBestEval.x;
      let y = this.currentBestEval.y;
      if(this.currentBestEval)
      return {
        type: ACTION_TYPES.WALK_TO,
        pos: createVector(x,y)
      };
    } else {
      return {
      type: ACTION_TYPES.WALK,
    };
    }
  }

  /**
   * scans a surrounding grid and gives each cell a value, depend on:
   * - distance to plants
   * - distance to enemies
   * - hunger
   * - etc
   */
  evaluateSurroundings(senses) {
    this.lastBestEval = this.currentBestEval;
    this.currentBestEval = undefined;
    this.evaluations = [];
    let i = 0;
    let j = 0;
    for (let y = this.pos.y - this.evoBoxSize / 2 + this.evoCellSize/2; y < this.pos.y + this.evoBoxSize / 2; y += this.evoCellSize) {
      this.evaluations[j] = [];
      for (let x = this.pos.x - this.evoBoxSize / 2 + this.evoCellSize/2; x < this.pos.x + this.evoBoxSize / 2; x += this.evoCellSize) {
        this.evaluations[j][i] = this.evaluatePosition(x, y, senses);
        i++;
      }
      j++;
    }

  }


  evaluatePosition(x, y, senses) {
    let val = 0;
    senses.plants.forEach(p => {
      let d = getDistance(x, y, p.pos.x, p.pos.y);
      val += p.mass / d;
    });
    // senses.creatures.forEach(c => {
    //   if (c === this.parent) return;
    //   let d = getDistance(x, y, c.pos.x, c.pos.y);
    //   val -= c.weight / (4 * d);
    // });
    let e = new Evaluation(x, y, val);
    if (!this.currentBestEval || e.value > this.currentBestEval.value) {
      //TODO: this will still prioritize the top left corner, from the loop order
      this.currentBestEval = e;
    }
    return e;
  }

  draw() {
    stroke(0);
    rectMode(CENTER);
    //square(this.body.pos.x, this.body.pos.y, this.evoBoxSize);

    this.evaluations.forEach(row => {
      row.forEach(cell => {
        let c = color(127 - cell.value * 50, 127 + cell.value * 50, 0, 100);
        fill(c);
        square(cell.x, cell.y, this.evoCellSize);
      })
    })
  }


}


const ACTION_TYPES = {
  IDLE: 0,
  WALK_TO: 1,
  WALK: 2,
  EAT: 3,
  FIGHT: 4,
  SLEEP: 5,

};

class Evaluation {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }
}