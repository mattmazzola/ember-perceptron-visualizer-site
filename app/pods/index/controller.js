import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  visualizerMode: false,
  visualizerReset: false,
  trainingPoints: null,
  idealLineSlope: null,
  idealLineOffset: null,
  trainedLineSlope: null,
  trainedLineOffset: null,
  perceptron: null,

  init() {
    this._super(...arguments);
    this.set('trainingPoints', []);
    this.set('perceptron', new perceptron.Perceptron(0.5, 0.1));
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
      // this.get('trainingPoints').pushObject(point);
    },

    idealLineUpdated(data) {
      console.log(data);
      this.get('trainingPoints').pushObjects(data.points);

      const run = (data.x2 - data.x1);
      let m = Infinity;
      if (run === 0) {
        m = (data.y2 - data.y1)/run;
      }


      this.set('idealLineSlope', m);
      this.set('idealLineOffset', 10);

      const trainingData = data.points
        .map(point => {
          return {
            vector: [point.x, point.y],
            output: point.result
          };
        });

      const theta = 0.5;
      this.get('perceptron').train(trainingData, theta, 0.1);
      const weights = this.get('perceptron').weights;
      console.log(`Weights: `, weights);

      const slope = -weights[0] / weights[1];
      const offset = theta / weights[1];

      this.set('trainedLineSlope', slope);
      this.set('trainedLineOffset', offset);
    },

    trainingLineUpdated(line) {
      console.log(line);
    }
  }
});
