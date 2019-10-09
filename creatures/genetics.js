"use strict";


class Gene {
  constructor(name, value, mutationChance, mutationRate, minValue, maxValue) {
    this.name = name;
    this.value = value;
    this.mutationChance = mutationChance || 0;
    this.mutationRate = mutationRate || 0;
    this.minValue = minValue || 0;
    this.maxValue = maxValue || 10;

  }

  copy() {
    return new Gene(this.name, this.value, this.mutationChance, this.mutationRate, this.minValue, this.maxValue);
  }

  mutate(mutationChance, mutationRate) {
    let chance = mutationChance || this.mutationChance;
    let rate = mutationRate || this.mutationRate;

    let c = Math.random();
    if (c < chance) {
      let delta = (2 * Math.random() - 1) * rate * this.value;
      this.value += delta;
      this.value = Math.min(this.value, this.maxValue);
      this.value = Math.max(this.value, this.minValue);
    }
    return this;

  }

}

class ColorGene {
  constructor(name, r, g, b, mutationChance, mutationRate) {
    this.name = name;
    this.rGene = new Gene(name + '_R', r, mutationChance, mutationRate, 0, 255);
    this.gGene = new Gene(name + '_G', g, mutationChance, mutationRate, 0, 255);
    this.bGene = new Gene(name + '_B', b, mutationChance, mutationRate, 0, 255);

    this.color = color(r,g,b);

    this.mutationChance = mutationChance;
    this.mutationRate = mutationRate;
  }

  copy() {
    return new ColorGene(this.name,
        this.rGene.value,
        this.gGene.value,
        this.bGene.value,
        this.mutationChance,
        this.mutationRate);
  }

  mutate(mutationChance, mutationRate) {
    this.rGene.mutate(mutationChance, mutationRate);
    this.gGene.mutate(mutationChance, mutationRate);
    this.bGene.mutate(mutationChance, mutationRate);
    return this;
  }

  get value() {
    return this.color;
  }

}


class Genome {
  constructor() {
    this.genes = [];
    this.genesByName = {};
  }


  addGene(gene) {
    this.genes.push(gene);
    this.genesByName[gene.name] = gene;
  }

  getGene(name) {
    //return this.genesByName[name];
    return this.genesByName[name];
  }


  copy() {
    let dna = new Genome();

    this.genes.forEach(g => dna.addGene(g.copy()));

    return dna;
  }

  /**
   * alters this.
   * @returns {Genome}
   */
  mutate() {
    this.genes.forEach(g => g.mutate());
    return this;

  }

  /**
   * creates new
   * @param genome
   */
  mix(genome) {
    let child = new Genome();
    this.genes.forEach(gene => {
      if(Math.random() <.5) {
        child.addGene(gene);
      } else {
        child.addGene(genome.genesByName[gene.name])
      }
    });

    return child;
  }
}


