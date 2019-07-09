'use strict'

const { City } = require('../models');
const Aggregate = require('./Aggregate');

module.exports = {
  async create (data) {
    const city = await City.findOne({ name: data.name});
    if(city) throw { status: 409, message: 'CITY.EXIST' };

    return City.create(data);
  },

  async findCRM (page, limit, sortOrder, sortField) {
    if(sortOrder == undefined){
      sortOrder = 'ascending'
    }
    const query = {
      page: ~~Number(page),
      limit: ~~Number(limit),
      sortOrder: 'ascending' === sortOrder ? 1 : -1,
      sortField: sortField || 'name',
    };

    return City.aggregate([
      {
        $facet: {
          results: [
            { $sort: { [query.sortField]: query.sortOrder} },
            ...Aggregate.skipAndLimit(query.page, query.limit)
          ],
          status: Aggregate.getStatusWithSimpleMatch(
            {},
            query.page,
            query.limit
          )
        }
      }
    ]).then(Aggregate.parseResults);
  },
  
  async findOne (id) {
    const city = await City.findOne({ _id: id })
    if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };

    return city;
  },

  async findCity (name,page,limit) {
   
    let city = City.aggregate([
      {
        $facet: {
          results: [
            { $match: { name: name }  },
            ...Aggregate.skipAndLimit(page, limit)
          ],
          status: Aggregate.getStatusWithSimpleMatch(
            {name:name},
            page,
            limit
          )
        }
      }
    ]).then(Aggregate.parseResults);

    return city
  },
  
  async update (id, data) {
    let city = await City.findOne({ _id: id });
    if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };

    if(data.name) {
      city = await City.findOne({ name: data.name});
      if(city) throw { status: 409, message: 'CITY.NAME.EXIST' };
    }

    return City.findByIdAndUpdate(id, data, { new: true });
  },

  async destroy (id) {
    const city = await City.findById(id);
    if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };

    await City.findByIdAndDelete(id)

    return;
  },

  async updateOne (id, data) {
    return City.findByIdAndUpdate(id, data, { new: true });
  },

  async getListOfCitiesNames() {
    const names = await City.find({isEnable: true}).select("name")

    return names
  }
};
