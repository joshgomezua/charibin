'use strict';

const { City } = require('../models');
const Aggregate = require('./Aggregate');
const Utilities = require('./Utilities');

module.exports = {
  async create (data) {
    const city = await City.findOne({ name: data.name, deleted: false });
    if(city) throw { status: 409, message: 'CITY.EXIST' };

    if(data.fake) {
      const feakedCitiesCount = await city.countDocuments({ fake: true });
      if(feakedCitiesCount === 2) throw { status: 403, message: 'CITY.FAKE.LIMIT' };
    }

    data.photo = await Utilities.upload(data.photo, 'png');
    return City.create(data);
  },
  
  async findCRM (page, limit) {
    return City.aggregate([
      {
        $facet: {
          results: [
            { $match: { deleted: false } },
            { $sort: { _id: -1 } },
            ...Aggregate.skipAndLimit(page, limit)
          ],
          status: Aggregate.getStatusWithSimpleMatch(
            { deleted: false },
            page,
            limit
          )
        }
      }
    ]).then(Aggregate.parseResults);
  },
  /*async update (id, data) {
    let city = await City.findOne({ _id: id, deleted: false });
    if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };

    if(data.photo)
      data.photo = await Utilities.upload(data.photo, 'png');

    if(data.name) {
      city = await City.findOne({ name: data.name, deleted: false });
      if(city) throw { status: 409, message: 'CITY.NAME.EXIST' };
    }

    return Trip.findByIdAndUpdate(id, data, { new: true });
  },

  async findOne (id) {
    const trip = await Trip.findOne({ _id: id, deleted: false }).populate('tickets');
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };

    return trip;
  },

  async getListOfTripsNames () {
    const names = await Trip.find({ deleted: false }).select('name');

    return names;
  },


  async destroy (id) {
    const trip = await Trip.findById(id);
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };

    await Ticket.deleteMany({ trip: id, blockedQuantity: { $size: 0 } });
    await Ticket.updateMany({
      trip: id,
      'blockedQuantity.0': { $exists: true }
    }, {
      quantity: 0,
      deleted: true
    });

    const ticketsCount = await Ticket.countDocuments({ trip: id });
    if(ticketsCount) {
      await Trip.updateOne({ _id: id }, { deleted: true });
    } else {
      await Trip.findByIdAndDelete(id);
    }

    return;
  },*/
};
