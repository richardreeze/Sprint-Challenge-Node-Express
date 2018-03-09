const express = require('express');

const app = express();

app.get('/compare', (req, res) => {
  res.send('hello');
});

app.listen(3000);
