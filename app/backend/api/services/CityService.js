'use strict'

const { City, Trip } = require('../models');
const Aggregate = require('./Aggregate');
var ObjectId = require('mongoose').Types.ObjectId;

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
      sortField: sortField,
    };

    if (sortField === undefined){
      return City.aggregate([
        {
          $facet: {
            results: [
              { $sort: { country:1,name:1 } },
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
    } else {
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
    }
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
    await Trip.updateMany({'departure._id': id  },
      { $set: {
          'departure.name': data.name,
          'departure.photo': data.photo,
          'departure.isEnabled': data.isEnabled,
          'departure.tags': data.tags,
          'departure.country': data.country,
          'departure.isManual': data.isManual
        },
      }, { new: true });

    await Trip.updateMany({'destination._id': id },
      { $set: {
        'destination.name': data.name,
        'destination.photo': data.photo,
        'destination.isEnabled': data.isEnabled,
        'destination.tags': data.tags,
        'destination.country': data.country,
        'destination.isManual': data.isManual
      },
    }, { new: true });

    return City.findByIdAndUpdate(id, data, { new: true });
  },

  async destroy (id) {
    const city = await City.findById(id);
    if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };

    await Trip.updateMany({ 'destination._id': id }, { $set: { 'active': false } })
    await Trip.updateMany({ 'departure._id': id }, { $set: { 'active': false } })
    await City.findByIdAndDelete(id)

    return;
  },

  async updateOne (id, data) {
   await Trip.updateMany({ 'destination._id': ObjectId(id) }, 
   { $set: { 'destination.isEnabled': data.isEnabled }},{ new: true });
   
   return City.findByIdAndUpdate(id, data, { new: true });
  },

  async getListOfCitiesNames() {
    const names = await City.find({isEnabled: true}).select("name")

    return names
  }
};
