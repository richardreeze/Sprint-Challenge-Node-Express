const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/compare', (req, res) => {
  fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
    .then(data => data.json())
    .then(currentPrice => console.log(currentPrice.bpi.USD.rate))
});

app.listen(3000);
