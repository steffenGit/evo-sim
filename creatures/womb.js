"use strict";


class Womb {
  constructor(creature) {
    this.parent = creature;
    this.dna = this.parent.dna;
    this.body = this.parent.body;
    this.initTraits();
    this.numChildren = 0;
    this.isPregnant = false;
    this.isFertile = false;
  }

  initTraits() {
    this.fertilityCoolDown = 300;

    this.maxChildren = 2;
  }

  giveBirth() {
    let child = this.parent.getOffspring();
    this.body.burnEnergy(this.body.energy/2);
  }

  update() {

    if(this.numChildren < this.maxChildren && this.parent.age % this.fertilityCoolDown === 0) {
      this.numChildren++;
      this.giveBirth();
    }
  }

}


class Egg {
  constructor(dna) {

  }

}

