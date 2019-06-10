'use strict';

const { Trip, Ticket } = require('../models');
const Aggregate = require('./Aggregate');
const Utilities = require('./Utilities');

module.exports = {
  async create (data) {
    const trip = await Trip.findOne({ name: data.name, deleted: false });
    if(trip) throw { status: 409, message: 'TRIP.EXIST' };

    if(data.fake) {
      const feakedTripsCount = await Trip.countDocuments({ fake: true });
      if(feakedTripsCount === 2) throw { status: 403, message: 'TRIP.FAKE.LIMIT' };
    }

    data.photo = await Utilities.upload(data.photo, 'png');
    return Trip.create(data);
  },

  async update (id, data) {
    let trip = await Trip.findOne({ _id: id, deleted: false });
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };

    if(data.photo)
      data.photo = await Utilities.upload(data.photo, 'png');
    //data.destination puis data.departure
    if(data.name) {
      trip = await Trip.findOne({ name: data.name, deleted: false });
      if(trip) throw { status: 409, message: 'TRIP.NAME.EXIST' };
    }

    return Trip.findByIdAndUpdate(id, data, { new: true });
  },

  async findOne (id) {
    const trip = await Trip.findOne({ _id: id, deleted: false }).populate('tickets');
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };

    return trip;
  },

  //Changer pour liste des villes de départs, ou liste selon les id ?
  async getListOfTripsNames () {
    const names = await Trip.find({ deleted: false }).select('name');

    return names;
  },

  async findCRM (page, limit) {
    return Trip.aggregate([
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
  },
};
