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
        function Perceptron(threshold, learningRate) {
            if (threshold === void 0) { threshold = 0.5; }
            if (learningRate === void 0) { learningRate = 0.1; }
            this.threshold = threshold;
            this.learningRate = learningRate;
        }
        Perceptron.prototype.train = function (trainingSet, threshold, learningRate) {
            if (threshold === void 0) { threshold = this.threshold; }
            if (learningRate === void 0) { learningRate = this.learningRate; }
            if (trainingSet.length === 0) {
                throw new Error("trainingSet data must be non-empty array. You provided: " + trainingSet);
            }
            // Create new weights vector matching length of training data and set values to 0
            var weights = Array.apply(null, new Array(trainingSet[0].vector.length)).map(function () { return 0; });
            var maxIterations = 2000;
            var i = 1;
            var _loop_1 = function() {
                var errorCount = 0;
                trainingSet
                    .forEach(function (_a) {
                    var vector = _a.vector, output = _a.output;
                    var dotProduct$$ = dotProduct(vector, weights);
                    var result = dotProduct$$ >= threshold;
                    var error = (output ? 1 : 0) - (result ? 1 : 0);
                    console.log("Vector: " + vector + ", Weights: " + weights + ", Output: " + dotProduct$$ + " - " + result + ", Expected: " + threshold + " - " + output);
                    if (error !== 0) {
                        errorCount += 1;
                        console.log('adjust weights');
                        vector
                            .forEach(function (x, i) {
                            weights[i] += learningRate * error * x;
                        });
                    }
                });
                if (errorCount === 0) {
                    return "break";
                }
            };
            for (i = 1; i <= maxIterations; i++) {
                var state_1 = _loop_1();
                if (state_1 === "break") break;
            }
            if (i === maxIterations) {
                throw new Error('Max Iterations reached. The training loop was terminated to prevent infinite loop');
            }
            this.weights = weights;
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