(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.perceptron = global.perceptron || {})));
}(this, function (exports) { 'use strict';

    function zip(xs, ys) {
        var smallerArray = xs.length < ys.length ? xs : ys;
        return smallerArray
            .map(function (x, i) { return [xs[i], ys[i]]; });
    }
    function dotProduct(xs, ys) {
        return zip(xs, ys)
            .map(function (_a) {
            var x = _a[0], y = _a[1];
            return x * y;
        })
            .reduce(function (a, b) { return a + b; });
    }

    var Perceptron = (function () {
        function Perceptron() {
            this.learningRate = 0.1;
        }
        Perceptron.prototype.train = function (trainingSet, learningRate) {
            if (learningRate === void 0) { learningRate = this.learningRate; }
            if (trainingSet.length === 0) {
                throw new Error("trainingSet data must be non-empty array. You provided: " + trainingSet);
            }
            // Normalize training data
            var maxDomain = trainingSet
                .map(function (x) { return Math.abs(x.vector[0]); })
                .reduce(function (a, b) { return Math.max(a, b); }, 0);
            var maxRange = trainingSet
                .map(function (x) { return Math.abs(x.vector[0]); })
                .reduce(function (a, b) { return Math.max(a, b); }, 0);
            var max = Math.max(maxDomain, maxRange);
            var normalizedTrainingData = trainingSet
                .map(function (trainingData) {
                var normalizedVector = trainingData.vector.map(function (x) { return x / max; });
                return {
                    vector: normalizedVector,
                    output: trainingData.output
                };
            });
            // Create new weights vector matching length of training data and set values to 0
            var weights = Array.apply(null, new Array(trainingSet[0].vector.length + 1)).map(function () { return 0; });
            var learningSet = [];
            var theta = 0;
            var maxIterations = 2000;
            var i;
            var _loop_1 = function() {
                var errorCount = 0;
                normalizedTrainingData
                    .forEach(function (_a) {
                    var vector = _a.vector, output = _a.output;
                    var trainingVector = vector.concat([1]);
                    var dotProduct$$ = dotProduct(trainingVector, weights);
                    var result = dotProduct$$ >= theta;
                    var error = (output ? 1 : 0) - (result ? 1 : 0);
                    var learningData = {
                        weights: weights.slice(0, 2),
                        vector: vector.slice(0),
                        dotProduct: dotProduct$$,
                        result,
                        threshold: -weights[2],
                        output,
                        weightChanges: [],
                        weightsChanged: false
                    };
                    learningSet.push(learningData);
                    if (error !== 0) {
                        errorCount += 1;
                        learningData.weightsChanged = true;
                        trainingVector
                            .forEach(function (x, i) {
                            var change = learningRate * error * x;
                            weights[i] += change;
                            learningData.weightChanges[i] = change;
                        });
                    }
                });
                if (errorCount === 0) {
                    return "break";
                }
            };
            for (i = 0; i < maxIterations; i++) {
                var state_1 = _loop_1();
                if (state_1 === "break") break;
            }
            this.weights = weights.slice(0, 2);
            this.threshold = -weights[2];
            if (i === maxIterations) {
                throw new Error('Max Iterations reached. The training loop was terminated to prevent infinite loop');
            }
            return learningSet;
        };
        Perceptron.prototype.perceive = function (vector, weights, threshold) {
            if (weights === void 0) { weights = this.weights; }
            if (threshold === void 0) { threshold = this.threshold; }
            if (vector.length !== weights.length) {
                throw new Error("The number of dimensions of the input vector must match the number of weights. You passed vector length: " + vector.length + ", weights.length: " + weights.length);
            }
            return dotProduct(vector, weights) >= threshold;
        };
        return Perceptron;
    }());

    exports.Perceptron = Perceptron;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=perceptron.js.map