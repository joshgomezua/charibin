'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketOwner = new Schema({
  owner: { type: String, unique: true },
  quantity: Number,
  billing: { type: Number, default: 0 },
  trips: [{
    trip: { type: Schema.Types.ObjectId, ref: 'Trip' },
    arrivalTicket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
    departureTicket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
    arrivalTimePrice: { type: Number, default: 0 },
    departureTimePrice: { type: Number, default: 0 },
    deselected: { type: Boolean, default: false },
    cost: { type: Number, default: 0 }
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TicketOwner', ticketOwner);
