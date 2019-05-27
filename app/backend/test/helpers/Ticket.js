'use strict';

const { Ticket, Trip } = require('../../api/models');

module.exports = {
  async createTicket (data) {
    const ticket = (await Ticket.create(data)).toObject();
    await Trip.findByIdAndUpdate(data.trip, { $addToSet: { tickets: ticket._id } });

    return ticket;
  }
};
