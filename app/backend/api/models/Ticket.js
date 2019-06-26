'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  trip: { type: Schema.Types.ObjectId, ref: 'Trip' },
  departure: String,
  destination: String,
  quantity: Number,
  soldTickets: Number,
  reservedQuantity: Number,
  departure: String,
  destination: String,
  type: { type: String, enum: global.config.custom.ticket.type },
  date: {
    start: Date,
    end: Date
  },
  active: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  blockedQuantity: [{
    owner: String, // Hash
    quantity: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
