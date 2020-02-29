

const express = require('express');
const dataManager = require('./service/data');
const chancesCalculator = require('./service/prediction-service');
const app = express();

app.use(express.json());

let responseObject = {
  highestMatch: 0,
  amountWon: 0,
  bestFittingNumbers: [],
  date: ''
}

// FOR TESTING
const testData = [1,2,3,13,26,28,35];

// Extract Numbers
const checkMatchingNumbers = (userNumbers, dataset) => {
  let matchedNumbers, highestMatch = 0;
  let matchingIndex = -1;
  let zusatzzahl = false;

  // Dataset loop
  for (var i = 0; i < dataset.length; i++) {
    if (matchedNumbers !== 0 && highestMatch < matchedNumbers) {
      highestMatch = matchedNumbers;
      matchingIndex = i - 1; // Previous index needed
    }
    matchedNumbers = 0; // Reset counter for matching numbers

    // Row Loop
    for (const [key, value] of Object.entries(dataset[i])) {

      if (i % 2 === 0) {
        // Lottozahlen stehen immer in einer geraden Zeile
        // console.log(i, key);
        if (key.indexOf('Zahl') === 0) {
          if (userNumbers.includes(value)) {
            console.log('test');
            matchedNumbers++;
          }
        }

        if (key === "Zusatzzahl" && value === userNumbers[6]) {
          zusatzzahl = true;
        } 
      }
    }
  }

  return ({
    highestMatch: highestMatch,
    matchingIndex: matchingIndex,
    zusatzzahl: zusatzzahl
  });
}

// Root-Route
app.get('/', (req, res) => {
  //const { userNumbers } = req.body;
  const userNumbers = testData;

  let calculatedResponse = checkMatchingNumbers(userNumbers, dataManager.dataOfTest);

  if (calculatedResponse.highestMatch >= 3) {

  }
  // responseObject = {...responseObject, 
  //   highestMatch: highestMatch
  // };

  res.json(calculatedResponse);
});


// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
