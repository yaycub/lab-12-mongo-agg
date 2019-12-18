const mongoose = require('mongoose');
const Brewery = require('./Brewery');

describe('Brewery Model', () => {
  it('requires a name', () => {
    const brewery = new Brewery();
    const { errors } = brewery.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('requires a type', () => {
    const brewery = new Brewery();
    const { errors } = brewery.validateSync();

    expect(errors.type.message).toEqual('Path `type` is required.');
  });

  it('requires a address', () => {
    const brewery = new Brewery();
    const { errors } = brewery.validateSync();

    expect(errors.address.message).toEqual('Path `address` is required.');
  });

  it('requires a state', () => {
    const brewery = new Brewery();
    const { errors } = brewery.validateSync();

    expect(errors.state.message).toEqual('Path `state` is required.');
  });

  it('has all required fields', () => {
    const brewery = new Brewery({
      name: 'beer',
      type: 'beer place',
      address: 'place of beer',
      state: 'legal beer state'
    });

    expect(brewery.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'beer',
      type: 'beer place',
      address: 'place of beer',
      state: 'legal beer state'
    });
  });
});
