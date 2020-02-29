const express = require('express');
const app = express();

app.use(express.json());

// Root-Route
app.get('/', (req, res) => {
  res.json('Hello World!');
});


// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000.')
});