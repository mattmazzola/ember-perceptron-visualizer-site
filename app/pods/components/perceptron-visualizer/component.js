import Ember from 'ember';

const {
  observer
} = Ember;

export default Ember.Component.extend({
  chart: null,

  didInsertElement() {
    this._super();

    const $element = this.$();
    const element = $element.get(0);
    const chart = new perceptronvisualizer('.perceptron-visualizer-container .ember-view',[-50,50], []); // jshint ignore:line
    this.set('chart', chart);

    element
      .addEventListener('pointAdded', event => {
        this.pointAdded(event.detail);
      });

    element
      .addEventListener('idealLineUpdated', event => {
        this.idealLineUpdated(event.detail);
      });

    element
      .addEventListener('trainingLineUpdated', event => {
        this.trainingLineUpdated(event.detail);
      });
  },

  modeObserver: observer('mode', function () {
    this.get('chart').setMode(this.get('mode'));
  }),

  resetObserver: observer('reset', function () {
    console.log('reset changed', this.get('reset'));
    this.get('chart').reset();
  }),

  addTrainingLines: observer('trainingLines', function () {
    console.log('trainingLines', this.get('trainingLines'));

    this.get('chart').setTrainingLines(this.get('trainingLines'));
  }),

  pointAdded(point) {
    this.callAction('onPointAdded', point);
  },

  idealLineUpdated(line) {
    this.callAction('onIdealLineUpdated', line);
  },

  trainingLineUpdated(line) {
    this.callAction('onTrainingLineUpdated', line);
  },

  callAction(property, value) {
    const action = this.get(property);
    if (typeof action === "function") {
      action(value);
    }
  }

});
