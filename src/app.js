const express = require('express');
const fetch = require('node-fetch');

const app = express();
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
const URI_CURRENT_PRICE = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
const URI_YESTERDAY_PRICE = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

app.get('/compare', (req, res) => {
  fetch(URI_YESTERDAY_PRICE)
    .then(data => data.json())
    .then(data => {
      const yesterdayPriceRaw = data.bpi[Object.keys(data.bpi)[0]];
      const yesterdayPrice = yesterdayPriceRaw.toFixed(2);
      fetch(URI_CURRENT_PRICE)
        .then(data => data.json())
        .then(data => {
          const todayPriceRaw = parseFloat(data.bpi.USD.rate.replace(/,/g, ''));
          const todayPrice = todayPriceRaw.toFixed(2);
          if (yesterdayPrice > todayPrice) {
            const priceDifference = yesterdayPrice - todayPrice;
            const message = 'Bitcoin is down $' + priceDifference.toFixed(2) + ' today';
            res.status(STATUS_SUCCESS);
            res.send(message);
          } else if (yesterdayPrice < todayPrice) {
            priceDifference = todayPrice - yesterdayPrice;
            const message = 'Bitcoin is up $' + priceDifference.toFixed(2) + ' today';
            res.status(STATUS_SUCCESS);
            res.send(message);
          }
        })
        .catch(err => {
          res.status(STATUS_USER_ERROR);
          res.send({err: err});
        })
    })
});

app.listen(3000);
