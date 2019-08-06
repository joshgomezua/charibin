'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduledTripSchema = new Schema({
  date: {
    start: Date,
    end: Date,
  },
  fake: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  childPrice: Number,
  adultPrice: Number,
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
  trip: { type: Schema.Types.ObjectId, ref: 'Trip' },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScheduledTrip', scheduledTripSchema);
