require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Brewery = require('../lib/models/Brewery');

describe('brewery routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can post a brewery', () => {
    return request(app)
      .post('/api/v1/breweries')
      .send({
        name: 'beer',
        type: 'beer place',
        address: 'place of beer',
        state: 'legal beer state'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'beer',
          type: 'beer place',
          address: 'place of beer',
          state: 'legal beer state',
          __v: 0
        });
      });
  });

  it('can get all breweries', async() => {
    const breweries = await Brewery.create([
      {
        name: 'beer',
        type: 'beer place',
        address: 'place of beer',
        state: 'legal beer state',
      },
      {
        name: 'ale',
        type: 'ale place',
        address: 'place of ale',
        state: 'legal ale state',
      },
      {
        name: 'stout',
        type: 'stout place',
        address: 'place of stout',
        state: 'legal stout state',
      }
    ]);

    return request(app)
      .get('/api/v1/breweries')
      .then(res => {
        breweries.forEach(brewery => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            name: brewery.name,
            type: brewery.type,
            address: brewery.address,
            state: brewery.state,
            __v: 0
          });
        });
      });
  });

  it('can get a brewery by Id', async() => {
    const brewery = await Brewery.create({
      name: 'beer',
      type: 'beer place',
      address: 'place of beer',
      state: 'legal beer state'
    });

    return request(app)
      .get(`/api/v1/breweries/${brewery._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: brewery.id,
          name: 'beer',
          type: 'beer place',
          address: 'place of beer',
          state: 'legal beer state',
          __v: 0
        });
      });
  });

  it('can patch a brewery by id', async() => {
    const brewery = await Brewery.create({
      name: 'beer',
      type: 'beer place',
      address: 'place of beer',
      state: 'legal beer state'
    });

    return request(app)
      .patch(`/api/v1/breweries/${brewery._id}`)
      .send({ name: 'ale' })
      .then(res => {
        expect(res.body).toEqual({
          _id: brewery.id,
          name: 'ale',
          type: 'beer place',
          address: 'place of beer',
          state: 'legal beer state',
          __v: 0
        });
      });
  });

  it('can delete a brewery by id', async() => {
    const brewery = await Brewery.create({
      name: 'beer',
      type: 'beer place',
      address: 'place of beer',
      state: 'legal beer state'
    });

    return request(app)
      .delete(`/api/v1/breweries/${brewery._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: brewery.id,
          name: 'beer',
          type: 'beer place',
          address: 'place of beer',
          state: 'legal beer state',
          __v: 0
        });
      });
  });
});
