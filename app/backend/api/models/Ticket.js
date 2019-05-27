'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  trip: { type: Schema.Types.ObjectId, ref: 'Trip' },
  direction: { type: String, enum: ['arrival', 'departure'] },
  quantity: Number,
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
