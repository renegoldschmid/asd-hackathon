const express = require('express');
const data = require('./service/data');
const app = express();

app.use(express.json());

// FOR TESTING
const testData = [1,2,3,4,5,6,7];

// Root-Route
app.get('/', (req, res) => {
  //const { numbers } = req.body;

  res.json('Hello World!');

});


// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000.')
});