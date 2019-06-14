'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  country: String,
  photo: String,
  tags: [String],
  isModify: Boolean
});

module.exports = mongoose.model('City', citySchema);