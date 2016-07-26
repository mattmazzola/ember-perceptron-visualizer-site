import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('perceptron-visualizer', 'Integration | Component | perceptron visualizer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{perceptron-visualizer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#perceptron-visualizer}}
      template block text
    {{/perceptron-visualizer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
