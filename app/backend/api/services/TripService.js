'use strict';

const { Trip, Ticket, City } = require('../models');
const Aggregate = require('./Aggregate');
const Utilities = require('./Utilities');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  async create (data) {

    const departureRegex = new RegExp(["^", data.departure.name, "$"].join(""), "i");
    const destinationRegex = new RegExp(["^", data.destination.name, "$"].join(""), "i");
    const carrierRegex = new RegExp(["^", data.carrier, "$"].join(""), "i");
    const typeRegex = new RegExp(["^", data.type, "$"].join(""), "i");

    const trip = await Trip.findOne({ 
      'departure.name': departureRegex,
      'destination.name': destinationRegex, 
      type: typeRegex, 
      carrier: carrierRegex, 
      deleted: false,
      active: true
     });
     data.departure._id = ObjectId(data.departure._id);
     data.destination._id = ObjectId(data.destination._id);
    if(trip) throw { status: 409, message: 'TRIP.EXIST' };

    if(data.fake) {
      const fakedTripsCount = await Trip.countDocuments({ fake: true });
      if(fakedTripsCount === 2) throw { status: 403, message: 'TRIP.FAKE.LIMIT' };
    }

    return Trip.create(data);
  },

  async update (id, data) {
    let trip = await Trip.findOne({ _id: id, deleted: false });
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };

    let ticketData = {};
    
    if (data.departure) {
      let city = await City.findOne({name: data.departure.name, isEnabled: true});
      if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };
      data.departure =  city;
      ticketData = {...ticketData, departure: data.departure.name}
    } else {
      data.departure = trip.departure;
    }

    if (data.destination) {
      let city = await City.findOne({name: data.destination.name, isEnabled: true});
      if(!city) throw { status: 404, message: 'CITY.NOT.EXIST' };
      data.destination = city;
      ticketData = {...ticketData, destination: data.destination.name}
    } else {
      data.destination = trip.destination;
    }

    if (data.carrier) {
      ticketData = {...ticketData, carrier: data.carrier}
    } else {
      data.carrier = trip.carrier;
    }

    if (data.type) {
      ticketData = {...ticketData, type: data.type}
    } else {
      data.type = trip.type;
    }

    if (data.adultPrice) {
      ticketData = {...ticketData, adultPrice: data.adultPrice}
    }

    if (data.childPrice) {
      ticketData = {...ticketData, childPrice: data.childPrice}
    }

    const departureRegex = new RegExp(["^", data.departure.name, "$"].join(""), "i");
    const destinationRegex = new RegExp(["^", data.destination.name, "$"].join(""), "i");
    const carrierRegex = new RegExp(["^", data.carrier, "$"].join(""), "i");
    const typeRegex = new RegExp(["^", data.type, "$"].join(""), "i");
  
    const potentialDuplicatesTrip = await Trip.findOne({
      _id: { $ne : ObjectId(id) },
      'departure.name': departureRegex,
      'destination.name': destinationRegex,
      type: typeRegex,
      carrier: carrierRegex,
      deleted: false,
      active: true
     });
     
     if (potentialDuplicatesTrip) {
         throw { status: 409, message: 'TRIP.EXIST' };
     }
     

    trip.tickets.forEach(async(ticketId) => {
      const ticket =  await Ticket.findByIdAndUpdate(ticketId, ticketData, {new: true});
    })

    
    return Trip.findByIdAndUpdate(id, data, { new: true });
  },

  async findOne (id) {
    const trip = await Trip.findOne({ _id: id, deleted: false }).populate('tickets');
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };

    return trip;
  },

  async getListOfTripsNames () {
    const names = await Trip.find({ deleted: false }).select('departure').select('destination').select('carrier').select('type');

    return names;
  },

  async getOpposites (id) {
    let trip = await Trip.findOne({ _id: id, deleted: false });
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };
    
    const opposites = await Trip.find({ deleted: false, departure: trip.destination, destination: trip.departure, carrier: trip.carrier }); // à indenter
    return opposites;
  },

  async findCRM (page, limit, sortOrder, sortField) {
    if(sortField){
      const query = {
        page: ~~Number(page),
        limit: ~~Number(limit),
        sortOrder: 'ascending' === sortOrder ? 1 : -1,
        sortField: sortField || '_id',
      };

      return Trip.aggregate([
        {
          $facet: {
            results: [
              { $match: { deleted: false } },
              { $sort: { [query.sortField]: query.sortOrder} },
              ...Aggregate.skipAndLimit(query.page, query.limit)
            ],
            status: Aggregate.getStatusWithSimpleMatch(
              { deleted: false },
              query.page,
              query.limit
            )
          }
        }
      ]).then(Aggregate.parseResults);
    } 
    else {
      return Trip.aggregate([
        {
          $facet: {
            results: [
              { $match: { deleted: false } },
              { $sort: { "departure.name": 1, "destination.name": 1, carrier: 1, type: 1} },
              ...Aggregate.skipAndLimit(page, limit)
            ],
            status: Aggregate.getStatusWithSimpleMatch(
              { deleted: false },
              page,
              limit
            )
          }
        }
      ]).then(Aggregate.parseResults);
    }
  },

  async destroy (id) {
    const trip = await Trip.findById(id);
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };

    await Ticket.deleteMany({ trip: id, blockedQuantity: { $size: 0 } });
    await Ticket.updateMany({
      trip: id,
      'blockedQuantity.0': { $exists: true }
    }, {
      quantity: 0,
      deleted: true
    });

    const ticketsCount = await Ticket.countDocuments({ trip: id });
    if(ticketsCount) {
      await Trip.updateOne({ _id: id }, { deleted: true });
    } else {
      await Trip.findByIdAndDelete(id);
    }

    return;
  },

  async findCitiesByName(uniqueCities) {
    const cities = await Promise.all(
      uniqueCities.map(async(item) => 
        City.findOne({name: item })
    ));
    return cities.filter((city) => city)
  },

  parseCities(cities) {
    return cities.map(city => ({
      label: city.name,
      country: city.country
    }));
  },

  getUniqueCountriesParsed(parsedCities) {
    return parsedCities.reduce((uniqueCountries, other) => {
      if(!uniqueCountries.some((item) => item.label === other.country)){
        uniqueCountries.push({
          label: other.country,
          country: 'country'
        });
      }
      return uniqueCountries;
    }, []);
  },

  segregateCountriesAndCities(countries, citiesParsed) {
    const segregatedCities = [];

    countries.forEach((country) => {
      segregatedCities.push([country])
    })

    segregatedCities.forEach((array) => {
      citiesParsed.forEach((city) => {
        if (city.country === array[0].label) {
          array.push(city)
        }
      })
    })

    return segregatedCities;
  },

  sortSegregation(segregatedCities) {
    segregatedCities.sort((a, b) => {
      if(a[0].label.toLowerCase() < b[0].label.toLowerCase()) { return -1; }
      if(a[0].label.toLowerCase() > b[0].label.toLowerCase()) { return 1; }
      return 0;
    })

    segregatedCities.forEach((array) => {
      const country = array[0];
      array.shift();

      array.sort((a, b) => {
        if(a.label.toLowerCase() < b.label.toLowerCase()) { return -1; }
        if(a.label.toLowerCase() > b.label.toLowerCase()) { return 1; }
        return 0;
      })

      array.unshift(country);
    })

    return segregatedCities;
  },

  parseSegregation(segregatedCities) {
    const citiesSorted = [];
    segregatedCities.forEach((array) => {
      citiesSorted.push(...array)
    })

    return citiesSorted.map((item, i) => {
      return {
        value: i,
        label: item.label,
        country: item.country
      }
    })
  },

  async getListCarriersFilters(){
    let uniqueCarriersFromTickets = await Ticket.distinct('carrier');

    const carriers = uniqueCarriersFromTickets.map((city, i) => ({
      value: i,
      label: city
    }));

    carriers.sort((a, b) => {
      if(a.label.toLowerCase() < b.label.toLowerCase()) { return -1; }
      if(a.label.toLowerCase() > b.label.toLowerCase()) { return 1; }
      return 0;
    });

    return carriers;
  },

  async getListFieldFilters(field) {
    let uniqueCitiesFromTickets = await Ticket.distinct(field);
    const cities = await this.findCitiesByName(uniqueCitiesFromTickets);
    const citiesParsed = this.parseCities(cities);
    const uniqueCountriesParsed = this.getUniqueCountriesParsed(citiesParsed);
    let segregatedTerritories = this.segregateCountriesAndCities(uniqueCountriesParsed, citiesParsed);
    segregatedTerritories = this.sortSegregation(segregatedTerritories);
    return this.parseSegregation(segregatedTerritories);
  },

  async getListOfTicketFilters() {
    
    const departures = await this.getListFieldFilters('departure')

    const destinations = await this.getListFieldFilters('destination')

    const carriers = await this.getListCarriersFilters();

    return {
      departures: departures,
      destinations: destinations,
      carriers: carriers
    }
  }
};
