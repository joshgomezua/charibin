'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  country: String,
  photo: String,
  tags: Array
});

module.exports = mongoose.model('City', citySchema);