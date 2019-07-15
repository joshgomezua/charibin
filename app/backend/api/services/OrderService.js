'use strict';

const { Order } = require('../models');
const Aggregate = require('./Aggregate');

module.exports = {
  async find (params) {
    const query = {
      page: ~~Number(params.page),
      limit: ~~Number(params.limit),
      sortOrder: 'ascending' === params.sortOrder ? 1 : -1,
      sortField: params.sortField || '_id',
    };

    const results = await Order.aggregate([{
      $facet: {
        results: [
          { $match: {} },
          { $sort: { _id: -1 } },
          ...Aggregate.skipAndLimit(query.page, query.limit),
        ],
        status: Aggregate.getStatusWithSimpleMatch({}, query.page, query.limit),
      },
    }]);

    return Aggregate.parseResults(results);
  },

  updateOne (id, data) {
    return Order.findByIdAndUpdate(id, data, { new: true });
  },
};
