'use strict';

module.exports = {
  getStatusWithSimpleMatch (matchQuery, page, limit) {
    return [
      { $match: matchQuery },
      { $count: 'total' },
      {
        $addFields: {
          offset: page * limit,
          done: {
            $cond: [
              { $gt: [{ $divide: ['$total', page * limit + limit] }, 1] },
              false,
              true
            ],
          },
        },
      },
      { $limit: 1 },
    ];
  },

  skipAndLimit (page, limit) {
    return [{ $skip: page * limit }, { $limit: limit }];
  },

  parseResults (results) {
    if (!results.length) throw { status: 400, message: 'AggregationFailed' };
    return {
      results: results[0].results,
      status: results[0].status[0] || { total: 0, done: true, offset: 0 }
    };
  },

  populateOne (from, localField, foreignField) {
    return {
      $lookup: {
        from,
        localField,
        foreignField,
        as: localField
      }
    };
  }
};
