'use strict';

const { Order } = require('../../api/models');

module.exports = {
  async createOrder (data) {
    const order = await new Order(data).save();
    return order.toObject();
  },
};
