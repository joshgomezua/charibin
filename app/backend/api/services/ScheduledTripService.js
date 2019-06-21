'use strict';

const { ScheduledTrip, Trip } = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  async create (data) {
    const sTrip = await ScheduledTrip.findOne({ id: data._id, deleted: false });
    if(sTrip) throw { status: 409, message: 'TRIP.EXIST' };

    return ScheduledTrip.create(data);
  },

  async findOne (id) {
    const sTrip = await ScheduledTrip.findOne({ _id: id, deleted: false }).populate('trip');
    if(!sTrip) throw { status: 404, message: 'SCHEDULED_TRIP.NOT.EXIST' };

    return sTrip;
  },

  async update (id, data) {
    if(data.trip) {
      const trip = await Trip.findOne({ _id: data.trip, deleted: false });
      if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };
    }

    const sTrip = await ScheduledTrip.findOne({ _id: id, deleted: false });
    if(!sTrip) throw { status: 404, message: 'SCHEDULED_TRIP.NOT.EXIST' };

    await ScheduledTrip.updateOne({ _id: id }, data);
    return ScheduledTrip.findById(id).populate('trip');
  },

  async destroy (id) {
    const sTrip = await ScheduledTrip.findById(id);
    if(!sTrip) throw { status: 404, message: 'TRIP.NOT.EXIST' };
    await ScheduledTrip.updateOne({
      _id: id
    }, { $set:
      { deleted: true }
    });

    await ScheduledTrip.findByIdAndDelete(id);
    await Trip.findByIdAndUpdate({ "_id": ObjectId(sTrip.trip) }, { $pull: { "scheduledTrips": { "_id" : ObjectId(id) } } }, { new: true });

    return;
  },
};
