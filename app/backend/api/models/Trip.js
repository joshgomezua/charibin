'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  departure: { type: String },
  destination: { type: String },
  fake: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  photo: String,
  price: Number,
  discount: Number,
  duration: Number,
  deselectionPrice: Number,
  deleted: { type: Boolean, default: false },
  tickets: { type: [Schema.Types.ObjectId], ref: 'Ticket' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trip', tripSchema);
