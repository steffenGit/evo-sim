"use strict";


class World {
  constructor(worldConfig) {
    this.creatures = [];
    this.plants = [];
    this.eggs = [];

    this.maxPlants = 15;
    this.plantMass = 50;
  }

  update() {
    this.creatures.forEach(c => c.update());
    this.plants.forEach(p => p.update());

    if(this.plants.length < this.maxPlants) {
      this.plantRandom();
    }
  }

  draw() {
    this.plants.forEach(p => p.draw());
    this.creatures.forEach(c => c.draw());
  }


  addCreature(creature) {
    this.creatures.push(creature);
  }

  removeCreature(creature) {
    let i = this.creatures.indexOf(creature);
    if(i >= 0) {
      console.log('removing ' + i);
      this.creatures.splice(i,1);
    }
  }

  plantRandom() {
    let x = width * Math.random();
    let y = height * Math.random();
    let plant = new Plant(this, x, y, this.plantMass);
  }

  addPlant(plant) {
    this.plants.push(plant);
  }

  removePlant(plant) {
    let i = this.plants.indexOf(plant);
    if(i >= 0) {
      this.plants.splice(i,1);
    }
  }
  addEgg(egg) {
    this.eggs.push(egg);
  }

  removeEgg(egg) {
    let i = this.eggs.indexOf(egg);
    if(i >= 0) {
      this.eggs.splice(i,1);
    }
  }


  senseCreatures(pos, r) {
    let ret = [];
    this.creatures.forEach(creature => {
      let d = p5.Vector.sub(creature.pos, pos);
      if(d.mag() < r) {
        ret.push(creature);
      }
    });
    return ret;
  }

  sensePlants(pos, r) {
    let ret = [];
    this.plants.forEach(plant => {
      let d = p5.Vector.sub(plant.pos, pos);
      if(d.mag() < r + plant.getRadius()) {
        ret.push(plant);
      }
    });
    return ret;
  }

  initWorldConfig() {

  }
}