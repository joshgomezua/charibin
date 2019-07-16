'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  departure: { type: Schema.Types, ref: 'City' },
  destination: { type: Schema.Types, ref: 'City' },
  fake: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  price: Number,
  discount: Number,
  duration: Number,
  deselectionPrice: Number,
  timeSelection: { 
    defaultPrice: Number,
    _0to6AM: Number,
    _6to8AM: Number,
    _8to10AM: Number,
    _10to12PM: Number,
    _12to2PM: Number,
    _2to4PM: Number,
    _4to6PM: Number,
    _6to8PM: Number,
    _8to10PM: Number,
    _10to12AM: Number
  },
  scheduledTrips: {type: Schema.Types, ref: 'ScheduledTrip'},
  carrier: { type: String },
  type: { type: String },
  deleted: { type: Boolean, default: false },
  tickets: { type: [Schema.Types.ObjectId], ref: 'Ticket' },
  createdAt: { type: Date, default: Date.now },
  isFromAPI: { type: Boolean, default: true }
});

module.exports = mongoose.model('Trip', tripSchema);
