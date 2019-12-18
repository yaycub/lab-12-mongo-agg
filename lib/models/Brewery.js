const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

schema.statics.getBreweriesByState = function() {
  return this.aggregate([
    [
      {
        '$group': {
          '_id': '$state', 
          'breweriesPerState': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'breweriesPerState': -1
        }
      }, {
        '$limit': 10
      }
    ]
  ]);
};

schema.statics.getBreweryTypeByState = function(state){
  return this.aggregate([
    {
      '$match': {
        'state': state
      }
    }, {
      '$group': {
        '_id': '$type', 
        'amount': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'amount': -1
      }
    }
  ]);
};

schema.statics.howManyOwned = function(){
  return this.aggregate([
    {
      '$group': {
        '_id': '$name', 
        'howMany': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'howMany': -1
      }
    }, {
      '$limit': 10
    }
  ]);
};

module.exports = mongoose.model('Brewery', schema);
