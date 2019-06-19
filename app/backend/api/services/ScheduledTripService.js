'use strict';

const { ScheduledTrip, Trip } = require('../models');

module.exports = {
  async create (data) {
    const sTrip = await ScheduledTrip.findOne({ id: data._id, deleted: false });
    if(sTrip) throw { status: 409, message: 'TRIP.EXIST' };

    return ScheduledTrip.create(data);
  },

  async destroy (id) {
    const sTrip = await ScheduledTrip.findById(id);
    if(!sTrip) throw { status: 404, message: 'TRIP.NOT.EXIST' };
    await ScheduledTrip.updateOne({
      _id: id
    }, { $set:
      { deleted: true }
    });
      console.log(sTrip.trip); // console log
      await ScheduledTrip.findByIdAndDelete(id);
      await Trip.findOneAndUpdate({ _id: sTrip.trip }, { $pull: { scheduledTrips: { _id : id } } }, { new: true });

    return;
  },
};
