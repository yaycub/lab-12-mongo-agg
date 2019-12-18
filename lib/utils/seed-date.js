const csv = require('csvtojson');
const Brewery = require('../models/Brewery');

function seedData(){
  return csv()
    .fromFile(__dirname + '/../../csv/breweries_us.csv')
    .then(breweries => {
      return breweries.map(brewery => ({
        name: brewery.brewery_name,
        type: brewery.type,
        address: brewery.address,
        state: brewery.state
      }));
    })
    .then(breweries => Brewery.create(breweries));
}

module.exports = {
  seedData
};
