"use strict";


const SPEED_UP = 1;
let creature, creature2, plant, world, watcher, hist;
let epoch = 0;

function setup() {
  frameRate(25);
  createCanvas(800, 600);


  let dna = new Genome();
  dna.addGene(new Gene('speed', 10, 1, 0.2));
  dna.addGene(new ColorGene('color', 70, 160, 220, 1, 0.2));
  dna.addGene(new Gene('sensorRadius', 80, .5, 0.1, 50, 300));
  dna.addGene(new Gene('energy', 100, 0, 0.9));
  dna.addGene(new Gene('maxEnergy', 100, 0, 0.9));
  dna.addGene(new Gene('fat', 100, 0, 0.9));
  dna.addGene(new Gene('maxFat', 100, 0, 0.9));
  dna.addGene(new Gene('muscle', 1, 0, 0.9));
  dna.addGene(new Gene('maxMuscle', 100, 0, 0.9));

  console.log(dna);

  let dna2 = new Genome();
  dna2.addGene(new Gene('speed', 10, 1, 0.2));
  dna2.addGene(new ColorGene('color', 210, 70, 130, 1, 0.2));
  dna2.addGene(new Gene('sensorRadius', 130, .5, 0.1, 50, 300));
  dna2.addGene(new Gene('energy', 100, 0, 0.9));
  dna2.addGene(new Gene('maxEnergy', 100, 0, 0.9));
  dna2.addGene(new Gene('fat', 100, 0, 0.9));
  dna2.addGene(new Gene('maxFat', 100, 0, 0.9));
  dna2.addGene(new Gene('muscle', 1, 0, 0.9));
  dna2.addGene(new Gene('maxMuscle', 100, 0, 0.9));

  console.log(dna2);
  world = new World();
  creature = new Creature(world, dna);
  creature2 = new Creature(world, dna2);
  watcher = new PropertyWatcher(creature.body, ['energy', 'fat', 'muscle']);
  // hist = new PropertyLiveHistogram(world.creatures, 'dna.genesByName.sensorRadius.value', 100, 60, 150);
  hist = new DnaHistogram(world.creatures, 'sensorRadius', 50, 'plotDiv');
  //hist = new DnaHistogram(world.creatures, 'energy', 50, 'plotDiv2');
}

function draw() {
  background(215);
  for (let i = 0; i < SPEED_UP; i++) {
    epoch++;

    world.update();
  }

  if(SPEED_UP < 4) {
    world.draw();
  }
  hist.watch(epoch);

  if (creature.alive)
    watcher.watch(epoch);
  //console.log(watcher.traces);
  //Plotly.newPlot('plotDiv', watcher.data);
  hist.draw();
}

