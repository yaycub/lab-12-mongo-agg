const { Router } = require('express');
const Brewery = require('../models/Brewery');

module.exports = Router()
  .post('/', (req, res, next) => {
    Brewery
      .create(req.body)
      .then(brewery => res.send(brewery))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Brewery
      .find()
      .then(breweries => res.send(breweries))
      .catch(next);
  });
