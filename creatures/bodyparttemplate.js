"use strict";


class Brain {
  constructor(creature) {
    this.parent = creature;
    this.dna = this.parent.dna;
    this.body = this.parent.body;
    this.sensor = this.parent.sensor;
    this.jaw = this.parent.jaw;

  }

  think(senses) {
    return {type: 1};
  }
}

