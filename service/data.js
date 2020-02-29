const path = require('path');

const data2017 = require(path.resolve('./data/2017.json'));
const data2018 = require(path.resolve('./data/2018.json'));
const data2019 = require(path.resolve('./data/2019.json'));

const transformedData = [...data2017,...data2018,...data2019]
const acc2017 = data2017.map(elem=> {return {...elem,date:"2017" }})
const acc2018 = data2018.map(elem=> {return {...elem,date:"2018" }})
const acc2019 = data2019.map(elem=> {return {...elem,date:"2019" }})

const accData =[...acc2017,...acc2018,...acc2019];

module.exports.dataOf2017 = data2017;
module.exports.dataOf2018 = data2018;
module.exports.dataOf2019 = data2019;
module.exports.transformedData = transformedData;
module.exports.accData = accData;
