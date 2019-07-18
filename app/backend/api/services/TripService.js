'use strict';

const { Trip, Ticket } = require('../models');
const Aggregate = require('./Aggregate');
const Utilities = require('./Utilities');

module.exports = {
  async create (data) {
    const trip = await Trip.findOne({ _id: data.id, deleted: false });
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

    if(data.name) {
      trip = await Trip.findOne({ name: data.name, deleted: false });
      if(trip) throw { status: 409, message: 'TRIP.DESTINATION.EXIST' };
    }

    return Trip.findByIdAndUpdate(id, data, { new: true });
  },

  async findOne (id) {
    const trip = await Trip.findOne({ _id: id, deleted: false }).populate('tickets');
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };

    return trip;
  },

  async getListOfTripsNames () {
    const names = await Trip.find({ deleted: false }).select('departure').select('destination');

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

  async getListOfTicketFilters() {
    const listOfFiltersNotParsed = await Trip.find({ deleted: false }).select('departure').select('destination').select('carrier');
    let departureFilters = [];
    let destinationFilters = [];
    let carrierFilters = [];

    listOfFiltersNotParsed.forEach((item) => {
      departureFilters.push({
        departure: item.departure.name,
        country: item.departure.country
      })

      destinationFilters.push({
        destination: item.destination.name,
        country: item.destination.country
      })

      carrierFilters.push({
        carrier: item.carrier,
      })
    });

    console.log('departureFilters', departureFilters)
    console.log('destinationFilters', destinationFilters)
    console.log('carrierFilters', carrierFilters)

    const uniqueDepartureFilters = departureFilters.reduce((uniqueCities, other) => {
      if(!uniqueCities.some((item) => item.departure === other.departure)){
        uniqueCities.push(other);
      }
      return uniqueCities;
    }, []);

    const uniqueDestinationFilters = destinationFilters.reduce((uniqueCities, other) => {
      if(!uniqueCities.some((item) => item.country === other.country)){
        uniqueCities.push(other);
      }
      return uniqueCities;
    }, []);

    const uniqueCarrierFilters = carrierFilters.reduce((unique, other) => {
      if(!unique.some((obj) => obj.carrier === other.carrier)) {
        unique.push(other);
      }
      return unique;
    },[]);

    console.log('uniqueDestinationFilters', uniqueDestinationFilters)
    console.log('uniqueDepartureFilters', uniqueDepartureFilters)
    console.log('uniqueCarrierFilters', uniqueCarrierFilters)

    const departuresParsed = uniqueDepartureFilters.map((city, i) => ({
      label: city.departure,
      country: city.country
    }));

    const uniqueDepartureCountryFiltersParsed = uniqueDepartureFilters.reduce((uniqueCountries, other) => {
      if(!uniqueCountries.some((item) => item.label === other.country)){
        uniqueCountries.push({
          label: other.country,
          country: 'country'
        });
      }
      return uniqueCountries;
    }, []);

    console.log('uniqueDepartureCountryFiltersParsed', uniqueDepartureCountryFiltersParsed)

    const segregatedDepartures = []
    uniqueDepartureCountryFiltersParsed.forEach((country) => {
      segregatedDepartures.push([country])
    })
    segregatedDepartures.forEach((array) => {
      departuresParsed.forEach((city) => {
        if (city.country === array[0].label) {
          array.push(city)
        }
      })
    })

    const destinationsParsed = uniqueDestinationFilters.map((city) => ({
      label: city.destination,
      country: city.country
    }));

    const uniqueDestinationCountryFiltersParsed = uniqueDestinationFilters.reduce((uniqueCountries, other) => {
      if(!uniqueCountries.some((item) => item.label === other.country)){
        uniqueCountries.push({
          label: other.country,
          country: 'country'
        });
      }
      return uniqueCountries;
    }, []);

    const segregatedDestinations = []
    uniqueDestinationCountryFiltersParsed.forEach((country) => {
      segregatedDestinations.push([country])
    })
    segregatedDestinations.forEach((array) => {
      destinationsParsed.forEach((city) => {
        if (city.country === array[0].label) {
          array.push(city)
        }
      })
    })

    segregatedDestinations.forEach((array) => {
      const country = array[0];
      array.shift();

      array.sort((a, b) => {
        if(a.firstname < b.firstname) { return -1; }
        if(a.firstname > b.firstname) { return 1; }
        return 0;
      })

      array.unshift(country);
    })

    segregatedDepartures.forEach((array) => {
      const country = array[0];
      array.shift();

      array.sort((a, b) => {
        if(a.firstname < b.firstname) { return -1; }
        if(a.firstname > b.firstname) { return 1; }
        return 0;
      })

      array.unshift(country);
    })

    console.log('segregatedDestinations', segregatedDestinations)
    console.log('segregatedDepartures', segregatedDepartures)

    const carriers = uniqueCarrierFilters.map((city, i) => ({
      value: i,
      label: city.carrier
    }));

    const departures = [];
    segregatedDepartures.forEach((array) => {
      departures.push(...array)
    })

    const destinations = [];
    segregatedDestinations.forEach((array) => {
      destinations.push(...array)
    })

    console.log('departures', departures)
    console.log('destinations', destinations)
    console.log('carriers', carriers)

    return {
      departures: departures,
      destinations: destinations,
      carriers: carriers
    }
  }
};
