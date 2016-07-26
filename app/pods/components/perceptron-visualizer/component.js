import Ember from 'ember';

const {
  observes
} = Ember;
export default Ember.Component.extend({
  chartMode: false,
  chartReset: false,
  slope: null,
  offset: null,
  chart: null,

  didInsertElement() {
    this._super();

    const $element = this.$();
    const element = $element.get(0);
    const chart = new perceptronvisualizer('.perceptron-visualizer-container .ember-view',[-50,50], []);
    this.set('chart', chart);

    $element
      .on('pointAdded', event => {
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

  didUpdateAttrs() {
    this._super(...arguments);

    if (this.get('mode') != this.get('chartMode')) {
      this.get('chart').toggleMode();
      this.set('chartMode', this.get('mode'));
    }

    if (this.get('reset') != this.get('chartReset')) {
      this.get('chart').reset();
    }

    if (this.get('slope') && this.get('offset')) {
      this.get('chart').updateTrainingLine(this.get('slope'), this.get('offset'));
    }
  },

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
