

const express = require('express');
const cors = require('cors');
const dataManager = require('./service/data');
const app = express();

app.use(express.json());
app.use(cors());

// Check for the best matching numbers
const checkMatchingNumbers = (userNumbers, dataset) => {
  let matchedNumbers, highestMatch = 0;
  let matchingIndex = -1;
  let zusatzzahl, zusatzzahlWithMatch = false;

  // Dataset loop
  for (var i = 0; i < dataset.length; i++) {
    if (matchedNumbers !== 0 && highestMatch < matchedNumbers) {
      highestMatch = matchedNumbers;
      zusatzzahlWithMatch = zusatzzahl; 
      matchingIndex = i - 1; // Previous index needed
    }
    matchedNumbers = 0; // Reset counter for matching numbers
    zusatzzahl = false; // reset zusatzzahl

    // Row Loop
    for (const [key, value] of Object.entries(dataset[i])) {

      if (i % 2 === 0) {
        // Lottozahlen stehen immer in einer geraden Zeile

        if (key.indexOf('Zahl') === 0) {
          if (userNumbers.includes(value)) {
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
    zusatzzahl: zusatzzahlWithMatch
  });
}

// Check the prize according to the best matching numbers
const getPrize = (calculatedResponse, dataset) => {
  let calculatedPrize = {};
  let data;
  
  if (calculatedResponse.highestMatch > 4 || (calculatedResponse.highestMatch === 4 && calculatedResponse.zusatzzahl)) {
    console.log('erster index', calculatedResponse.matchingIndex);
    data = dataset[calculatedResponse.matchingIndex];
  } else if ((calculatedResponse.highestMatch < 4 && calculatedResponse.highestMatch > 2) 
    || (calculatedResponse.highestMatch === 4 && !calculatedResponse.zusatzzahl)) {
    console.log('zweiter index', calculatedResponse.matchingIndex);
    data = dataset[calculatedResponse.matchingIndex];
    dataPrize = dataset[calculatedResponse.matchingIndex + 1];
  } else {
    return {};
  }

  console.log(data);

  switch(calculatedResponse.highestMatch) {
    case 3:
      if (calculatedResponse.zusatzzahl) {
        calculatedPrize = {
          bestFittingNumbers: [data.Zahl1, data.Zahl2, data.Zahl3, data.Zahl4, data.Zahl5, data.Zahl6, data.Zusatzzahl],
          amountWon: dataPrize.Quote_2_6,
          date: data.date
        }
      } else {
        calculatedPrize = {
          bestFittingNumbers: [data.Zahl1, data.Zahl2, data.Zahl3, data.Zahl4, data.Zahl5, data.Zahl6, data.Zusatzzahl],
          amountWon: dataPrize.Quote_3_7,
          date: data.date
        }
      }
      break;
    case 4:
      if (calculatedResponse.zusatzzahl) {
        calculatedPrize = {
          bestFittingNumbers: [data.Zahl1, data.Zahl2, data.Zahl3, data.Zahl4, data.Zahl5, data.Zahl6, data.Zusatzzahl],
          amountWon: dataPrize.Quote_4_8,
          date: data.date
        }
      } else {
        calculatedPrize = {
          bestFittingNumbers: [data.Zahl1, data.Zahl2, data.Zahl3, data.Zahl4, data.Zahl5, data.Zahl6, data.Zusatzzahl],
          amountWon: data.Quote_1_5,
          date: data.date
        }
      }
      break;
    case 5:
      if (calculatedResponse.zusatzzahl) {
        calculatedPrize = {
          bestFittingNumbers: [data.Zahl1, data.Zahl2, data.Zahl3, data.Zahl4, data.Zahl5, data.Zahl6, data.Zusatzzahl],
          amountWon: data.Quote_2_6,
          date: data.date
        }
      } else {
        calculatedPrize = {
          bestFittingNumbers: [data.Zahl1, data.Zahl2, data.Zahl3, data.Zahl4, data.Zahl5, data.Zahl6, data.Zusatzzahl],
          amountWon: data.Quote_3_7,
          date: data.date
        }
      }
      break;
    case 6:
      calculatedPrize = {
        bestFittingNumbers: [data.Zahl1, data.Zahl2, data.Zahl3, data.Zahl4, data.Zahl5, data.Zahl6, data.Zusatzzahl],
        amountWon: data.Quote_1_5,
        date: data.date
      }
      break;
    default:
      // todo
      console.log('Nix');
  }

  return calculatedPrize;
}

// Root-Route
app.get('/', (req, res) => {
  const numbers = req.query.numbers;
  console.log(req.query.numbers);

  let calculatedMatchingNumbers = checkMatchingNumbers(numbers, dataManager.dataOf2019);
  let calculatedPrize = getPrize(calculatedMatchingNumbers, dataManager.dataOf2019);
  
  let date = new Date();
  let serverResponse = {
    data: {
      lastAppearence: '',
      bestFittingNumbers: calculatedPrize.bestFittingNumbers,
      propability: 1,
      winAmount: calculatedPrize.amountWon,
    },
    success: true
  };

  res.json(serverResponse);
});


// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
