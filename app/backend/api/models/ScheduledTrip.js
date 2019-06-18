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
  price: Number,
  discount: Number,
  duration: Number,
  deselectionPrice: Number,
  timeSelection: { 
    defaultPrice: Number,
    time1: Number,
    time2: Number,
    time3: Number,
    time4: Number,
    time5: Number,
    time6: Number,
    time7: Number,
    time8: Number,
    time9: Number,
    time10: Number
  },
  trip: { type: Schema.Types.ObjectId, ref: 'Trip' },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScheduledTrip', scheduledTripSchema);
