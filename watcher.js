"use strict";



class PropertyWatcher {
  constructor(obj, properties) {
    this.obj = obj;
    this.props = properties;
    this.data = [];
    this.initData();
  }

  initData() {
    this.props.forEach(prop => {
      let t = {
        y:[],
        x:[],
        name: prop,
        type: 'scatter',
      };

      this.data.push(t);
    })
  }


  watch(x) {
    this.data.forEach(t => {
      let y = this.obj[t.name];
      t.y.push(y);
      t.x.push(x);
    })
  }
}

class PropertyLiveHistogram {
  constructor(list, propertyNames, numberOfBuckets, minValue, maxValue, div) {
    this.buckets = [];
    this.list = list;
    this.propertyNames = propertyNames;
    this.div = div;
    this.data = [];

    this.initData(propertyNames, numberOfBuckets, minValue, maxValue)
  }

  initData(propertyNames, numberOfBuckets, minValue, maxValue) {
    this.data = [
      {
        x: [],
        y: [],
        type: 'bar'
      }
    ];

    let dif = (maxValue - minValue) / numberOfBuckets;
    for(let i = 0; i < numberOfBuckets; i++) {
      let bucket = {
        min: minValue + i*dif,
        max: minValue + (i+1)*dif,
        items : []
      };
      this.buckets.push(bucket);
      this.data[0].x.push(bucket.min + '-' +bucket.max);
    }
  }

  draw() {
    Plotly.newPlot(this.div, hist.data, {
      title: {
        text: hist.geneName + ' Histogram. Epoch: ' + epoch
      }
    });
  }

  watch(x) {
    this.data[0].y = [];
    for(let i = 0; i < this.buckets.length; i++) {
      this.buckets[i].items = [];
    }
    this.list.forEach(e => {

      for(let i = 0; i < this.buckets.length; i++) {

        if(getRecursivly(e, this.propertyNames) >= this.buckets[i].min && getRecursivly(e, this.propertyNames) < this.buckets[i].max ) {
          this.buckets[i].items.push(e);
        }


      }
    });
    for(let i = 0; i < this.buckets.length; i++) {
      this.data[0].y.push(this.buckets[i].items.length);    }
  }

}


class DnaHistogram extends PropertyLiveHistogram{
  constructor(creatures, geneName, numberOfBuckets, div) {

    let propertyName = 'dna.genesByName.'+geneName+'.value';
    let minValue = creatures[0].dna.genesByName[geneName].minValue;
    let maxValue = creatures[0].dna.genesByName[geneName].maxValue;
    super(creatures, propertyName, numberOfBuckets, minValue, maxValue, div);

    this.geneName = geneName;
  }

}



