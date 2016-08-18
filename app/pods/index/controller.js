import Ember from 'ember';

export default Ember.Controller.extend({
  interval: 1000,
  learningDatas: null,
  visualizerMode: true,
  visualizerReset: false,
  trainingPoints: null,
  idealLineSlope: null,
  idealLineOffset: null,
  trainedLineSlope: null,
  trainedLineOffset: null,
  trainingLines: null,
  perceptron: null,

  init() {
    this._super(...arguments);
    this.set('trainingPoints', []);
    this.set('trainingLines', []);
    this.set('learningDatas', []);
    this.set('perceptron', new perceptron.Perceptron(0.5, 0.1)); // jshint ignore:line
    console.log(this);
  },

  actions: {
    changeModesClicked() {
      this.toggleProperty('visualizerMode');
    },

    resetClicked() {
      this.toggleProperty('visualizerReset');
      this.get('trainingPoints').clear();
    },

    pointAdded(point) {
      console.log(`Point Added: `, point);
    },

    idealLineUpdated(data) {
      console.log('idealLineUpdated', data);

      this.get('trainingPoints').pushObjects(data.points);
      this.set('idealLineSlope', data.slope);
      this.set('idealLineOffset', data.offset);

      const trainingData = data.points
        .map(point => {
          return {
            vector: [point.x, point.y],
            output: point.result
          };
        });

      const learningDatas = this.get('perceptron').train(trainingData, 0.2);
      const trainingLines = learningDatas
        .filter(x => x.weightsChanged)
        .map(x => {
          let slope = 0;
          let offset = 0;
          if (x.weights[1] !== 0) {
            slope = -x.weights[0] / x.weights[1];
            offset = x.threshold / x.weights[1];
          }
          
          return Ember.$.extend({
            slope,
            offset
          }, x);
        });

      console.log('trainingLines', trainingLines);
      this.set('trainingLines', trainingLines);
      this.get('learningDatas').pushObjects(trainingLines);

      const weights = this.get('perceptron').weights;
      const threshold = this.get('perceptron').threshold;

      let slope = 0;
      let offset = 0;
      if (weights[1] !== 0) {
        slope = -weights[0] / weights[1];
        offset = threshold / weights[1];
      }
        
      this.set('trainedLineSlope', slope);
      this.set('trainedLineOffset', offset);
    },

    trainingLineUpdated(line) {
      console.log('trainingLineUpdated', line);
      console.log(line);
    }
  }
});
