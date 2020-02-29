const path = require('path');

const data2017 = require(path.resolve('./data/2017.json'));
const data2018 = require(path.resolve('./data/2017.json'));
const data2019 = require(path.resolve('./data/2017.json'));

const dataTest = require(path.resolve('./data/test.json'));

module.exports.dataOf2017 = data2017;
module.exports.dataOf2018 = data2018;
module.exports.dataOf2019 = data2019;

module.exports.dataOfTest = dataTest;