const { Router } = require('express');
const Brewery = require('../models/Brewery');

module.exports = Router()
  .post('/', (req, res, next) => {
    Brewery
      .create(req.body)
      .then(brewery => res.send(brewery))
      .catch(next);
  })

  .get('/top-breweries', (req, res, next) => {
    Brewery
      .getBreweriesByState()
      .then(breweries => res.send(breweries))
      .catch(next);
  })

  .get('/brew-by-state', (req, res, next) => {
    const { state = 'oregon' } = req.query;
    const lowerCaseState = state.toLowerCase();
    Brewery
      .getBreweryTypeByState(lowerCaseState)
      .then(breweries => res.send(breweries))
      .catch(next);
  })

  .get('/owns-the-most', (req, res, next) => {
    Brewery
      .howManyOwned()
      .then(results => res.send(results))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Brewery
      .find()
      .then(breweries => res.send(breweries))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Brewery
      .findById(req.params.id)
      .then(brewery => res.send(brewery))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Brewery
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(brewery => res.send(brewery))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Brewery
      .findByIdAndDelete(req.params.id)
      .then(brewery => res.send(brewery))
      .catch(next);
  });
