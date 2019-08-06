'use strict';

const { ScheduledTrip, Trip } = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

  async findOne (id) {
    const sTrip = await ScheduledTrip.findOne({ _id: id, deleted: false });
    if(!sTrip) throw { status: 404, message: 'SCHEDULED_TRIP.NOT.EXIST' };

    return sTrip;
  },

  async create (data) {
    const trip = await Trip.findOne({ _id: data.trip, deleted: false });
    if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };

    let sTrip = await ScheduledTrip.findOne({ trip: data.trip, date: { start: new Date(data.date.start), end: new Date(data.date.end) } });
    if(sTrip) {
      sTrip = await ScheduledTrip.updateOne({ _id: sTrip._id }, { new: true });

      return { ...sTrip, updated: true };
    } else {
      sTrip = await ScheduledTrip.create(data);
      await Trip.findByIdAndUpdate({ '_id': ObjectId(sTrip.trip) }, 
        { $addToSet: 
          { 'scheduledTrips': { 
              '_id' : ObjectId(sTrip._id),
              'date': {
                'start': data.date.start,
                'end': data.date.end,
              },
              'active': data.active,
              'deleted' : false,
              'adultPrice': data.adultPrice,
              'childPrice': data.childPrice,
              'discount': data.discount,
              'duration': data.duration,
              'deselectionPrice': data.deselectionPrice,
              'timeSelection': { 
                'defaultPrice': data.timeSelection.defaultPrice,
                '_0to6AM': data.timeSelection._0to6AM,
                '_6to8AM': data.timeSelection._6to8AM,
                '_8to10AM': data.timeSelection._8to10AM,
                '_10to12PM': data.timeSelection._10to12PM,
                '_12to2PM': data.timeSelection._12to2PM,
                '_2to4PM': data.timeSelection._2to4PM,
                '_4to6PM': data.timeSelection._4to6PM,
                '_6to8PM': data.timeSelection._6to8PM,
                '_8to10PM': data.timeSelection._8to10PM,
                '_10to12AM': data.timeSelection._10to12AM
              },
              'trip': ObjectId(data.trip),
            }
          } 
        }, { new: true });

      return { ...sTrip.toObject(), updated: false };
      }
  },

  async update (id, data) {
    if(data.trip) {
      const trip = await Trip.findOne({ _id: data.trip, deleted: false });
      if(!trip) throw { status: 404, message: 'TRIP.NOT.EXIST' };
    }

    const sTrip = await ScheduledTrip.findOne({ _id: id, deleted: false });
    if(!sTrip) throw { status: 404, message: 'SCHEDULED_TRIP.NOT.EXIST' };

    await ScheduledTrip.updateOne({ _id: id }, data);
    await Trip.findOneAndUpdate({ 'scheduledTrips': { $elemMatch: { '_id': ObjectId(sTrip._id) } } }, 
        { $set: 
          { 
            'scheduledTrips.$.date': {
              'start': data.date.start,
              'end': data.date.end,
            },
            'scheduledTrips.$.active': data.active,
            'scheduledTrips.$.deleted' : false,
            'scheduledTrips.$.adultPrice': data.adultPrice,
            'scheduledTrips.$.childPrice': data.childPrice,
            'scheduledTrips.$.discount': data.discount,
            'scheduledTrips.$.duration': data.duration,
            'scheduledTrips.$.deselectionPrice': data.deselectionPrice,
            'scheduledTrips.$.timeSelection': { 
              'defaultPrice': data.timeSelection.defaultPrice,
              '_0to6AM': data.timeSelection._0to6AM,
              '_6to8AM': data.timeSelection._6to8AM,
              '_8to10AM': data.timeSelection._8to10AM,
              '_10to12PM': data.timeSelection._10to12PM,
              '_12to2PM': data.timeSelection._12to2PM,
              '_2to4PM': data.timeSelection._2to4PM,
              '_4to6PM': data.timeSelection._4to6PM,
              '_6to8PM': data.timeSelection._6to8PM,
              '_8to10PM': data.timeSelection._8to10PM,
              '_10to12AM': data.timeSelection._10to12AM
            },
          }, 
        }, { new: true });

    return ScheduledTrip.findById(id).populate('trip');
  },

  async destroy (id) {
    const sTrip = await ScheduledTrip.findById(id);
    if(!sTrip) throw { status: 404, message: 'TRIP.NOT.EXIST' };
    await ScheduledTrip.updateOne({
      _id: id
    }, { $set:
      { deleted: true }
    });

    await ScheduledTrip.findByIdAndDelete(id);
    await Trip.findByIdAndUpdate({ "_id": ObjectId(sTrip.trip) }, { $pull: { "scheduledTrips": { "_id" : ObjectId(id) } } }, { new: true });

    return;
  },
};
