'use strict';

const { Trip } = require('../../api/models');

module.exports = {
  async createTrip (data) {
    try {
      const trip = await Trip.create(data);
      return trip.toObject();

    } catch (err) {
      data.name = `${data.name}_next`;
      const trip = await this.createTrip(data);
      return typeof trip.toObject === 'function' ? trip.toObject() : trip;
    }
  }
};
