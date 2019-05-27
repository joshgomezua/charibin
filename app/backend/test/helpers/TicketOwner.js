'use strict';

const { TicketOwner, Trip, Ticket } = require('../../api/models');

module.exports = {
  async getOwnerBillingInfoById (id) {
    const ownerBillingInfo = (await TicketOwner.findById(id)).toObject();

    return ownerBillingInfo;
  },

  async populateTrips (trips) {
    for (let selectedTrip of trips) {
      selectedTrip.trip = await Trip.findById(selectedTrip.trip);
      selectedTrip.arrivalTicket = await Ticket.findById(selectedTrip.arrivalTicket);
      selectedTrip.departureTicket = await Ticket.findById(selectedTrip.departureTicket);
    }

    return trips;
  }
};
