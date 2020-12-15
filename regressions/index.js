require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');
const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');

let { features, labels, testFeatures, testLabels } = loadCSV('./cars.csv' , {
    shuffle: true,
    splitTest: 50,
    dataColumns: ['horsepower', 'weight', 'displacement'],
    labelColumns: ['mpg']
});

const regression = new LinearRegression(features, labels, {
    learningRate: 0.1,
    iterations: 25
});

// regression.features.print();

regression.train();

const r2 = regression.test(testFeatures, testLabels);

// console.log('MSE History', regression.mseHistory);

//   PLOT mse History per iteration
plot({
    x: regression.mseHistory.reverse(),
    xLabel: 'Iteration #',
    yLabel: 'Mean Squared Error'
});

// PLOT MSE to B values
// plot({
//     x: regression.bHistory,
//     y: regression.mseHistory.reverse(),
//     xLabel: 'Value of B',
//     yLabel: 'Mean Squared Error'
// });

console.log('R2 is', r2);