'use strict'

'use strict';

const { City } = require('../models');
const Aggregate = require('./Aggregate');
//const Utilities = require('./Utilities');

module.exports = {
  async create (data) {
    const city = await City.findOne({ name: data.name});
    if(city) throw { status: 409, message: 'CITY.EXIST' };

    return City.create(data);
  },

  async findCRM (page, limit) {
    return City.aggregate([
      {
        $facet: {
          results: [
            ...Aggregate.skipAndLimit(page, limit)
          ],
          status: Aggregate.getStatusWithSimpleMatch(
            {},
            page,
            limit
          )
        }
      }
    ]).then(Aggregate.parseResults);
  },
  async findOne (id) {
    const city = await City.findOne({ _id: id })
    if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };

    return city;
  },
  
  async update (id, data) {
    let city = await City.findOne({ _id: id });
    if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };

    if(data.name) {
      city = await City.findOne({ name: data.name});
      if(city) throw { status: 409, message: 'CITY.NAME.EXIST' };
    }

    return City.findByIdAndUpdate(id, data, { new: true });
  },

  async destroy (id) {
    const city = await City.findById(id);
    if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };

    await City.findByIdAndDelete(id)

    return;
  },

  updateOne (id, data) {
    return City.findByIdAndUpdate(id, data, { new: true });
  },
  /*
  async getListOfTripsNames () {
    const names = await Trip.find({ deleted: false }).select('name');

    return names;
  },
  */

};
