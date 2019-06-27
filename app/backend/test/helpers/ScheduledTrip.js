'use strict';

const { ScheduledTrip, Trip } = require('../../api/models');

module.exports = {
  async createScheduledTrip (data) {
    const sTrip = (await ScheduledTrip.create(data)).toObject();
    await Trip.findByIdAndUpdate(data.trip, { $addToSet: { scheduledTrips: sTrip } });

    return sTrip;
  }
};