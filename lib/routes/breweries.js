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
