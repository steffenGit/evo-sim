"use strict";


class Mouth {
  constructor(creature) {
    this.parent = creature;
    this.dna = this.parent.dna;
    this.initTraits();
  }

  initTraits() {

    this.jawMuscleRatio = 1;
    this.jawRadius = 50;
  }

  getJawSize() {
    return this.jawMuscleRatio * this.parent.body.muscle;
  }

  bite(food) {
    let thisBite = food.takeBite(this.getJawSize());
    this.parent.body.consumeFood(thisBite);
  }
}