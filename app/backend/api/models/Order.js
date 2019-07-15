'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyer: {
    name: String,
    email: String,
    phone: String,
    birthDate: Date,
    address: String,
    city: String,
    zipCode: String,
  },
  stripeChargeId: String,
  selected: String,
  deselected: String,
  finalSelection: String,
  finalDestination: String,
  date: {
    arrival: {
      start: Date,
      end: Date
    },
    departure: {
      start: Date,
      end: Date
    },
  },
  quantity: Number,
  ticketPrice: Number,
  arrivalTimePrice: Number,
  departureTimePrice: Number,
  deselectionPrice: Number,
  totalPrice: Number,
  sent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  user: {
    email: { type: String, unique: true },
    name: String,
    role: { type: String, enum: ['Administrator', 'Modify', 'Read Only', 'Client'] },
    password: String,
    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    isDeleted:{ type: Boolean, default: false },
  }
});

module.exports = mongoose.model('Order', orderSchema);
