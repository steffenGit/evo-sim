"use strict";
const FOOD_TO_ENERGY = 1;
const FAT_TO_ENERGY = 1;
const ENERGY_TO_FAT = 1;
const ENERGY_TO_MUSCLE = 1;


class Body {
  constructor(creature) {
    this.parent = creature;
    this.pos = this.parent.pos;
    this.dna = this.parent.dna;

    this.initTraits();

  }

  initTraits() {
    this.color = this.dna.getGene('color').value;

    this.energy = this.dna.getGene('energy').value;
    this.maxEnergy = this.dna.getGene('maxEnergy').value;

    this.fat = this.dna.getGene('fat').value;
    this.maxFat = this.dna.getGene('maxFat').value;

    this.muscle = this.dna.getGene('muscle').value;
    this.maxMuscle = this.dna.getGene('maxMuscle').value;
  }

  getWeight() {
    return this.muscle + this.fat + this.maxEnergy;
  }

  draw() {
    stroke(this.color);
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.getWeight()/10);
  }

  update() {
    // TODO: Burn Fat
    let dE = this.maxEnergy - this.energy;
    let e = this.burnFat(dE/FAT_TO_ENERGY);
    this.gatherEnergy(dE - e);


  }

  idle() {
    this.burnEnergy((this.getWeight()/200) ** 3);
  }


  consumeFood(food) {
    let e = food * FOOD_TO_ENERGY;

    e = this.gatherEnergy(e);
    e = this.gatherMuscle(e * ENERGY_TO_MUSCLE);
    e = this.gatherFat(e * ENERGY_TO_FAT);

    this.poop(e);

  }


  gatherEnergy(energy) {
    this.energy += energy;
    if (this.energy > this.maxEnergy) {
      let d = this.energy - this.maxEnergy;
      this.energy = this.maxEnergy;
      return d;
    }
    return 0;
  }

  gatherMuscle(muscle) {
    this.muscle += muscle;
    if (this.muscle > this.maxMuscle) {
      let d = this.muscle - this.maxMuscle;
      this.muscle = this.maxMuscle;
      return d;
    }
    return 0;
  }

  gatherFat(fat) {
    this.fat += fat;
    if (this.fat > this.maxFat) {
      let d = this.fat - this.maxFat;
      this.fat = this.maxFat;
      return d;
    }
    return 0;
  }

  burnFat(fat) {
    this.fat -= fat;
    if (this.fat < 0) {
      let d = -this.fat;
      this.fat = 0;
      return d;
    }

    return 0;
  }


  burnEnergy(energy) {
    this.energy -= energy;
    if (this.energy < 0) {
      this.parent.die();
      return -this.energy;
    }

    return 0;
  }


  poop(e) {

  }
}
