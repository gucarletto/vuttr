var express = require('express');
// Set up the express app
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
}); 