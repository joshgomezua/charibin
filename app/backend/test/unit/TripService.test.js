'use strict';

module.exports = function (globals) {
  const {
    should,
    helpers,
    services: { TripService },
    models: { User, Ticket, Trip, TicketOwner },
    data: { trip, administrator, ticket },
    dataTemplate: { trip: tripTemplate }
  } = globals;

  describe('TripService', () => {
    let tripEntry;
    let adminEntry;

    beforeEach(async () => {
      await User.deleteMany();
      await TicketOwner.deleteMany();
      await Trip.deleteMany();
      await Ticket.deleteMany();

      tripEntry = await helpers.createTrip(trip);
      adminEntry = await helpers.createUser(administrator);
    });

    describe('.create()', () => {
      it('it should return created trip without tickets', async () => {
        const newTrip = await TripService.create({ ...trip, name: `${trip.destination} East` });

        newTrip.toObject().should.have.all.keys(...Object.keys(global.patterns.Trip));
      });

      it('it should throw 409 status', async () => {
        try {
          await TripService.create(trip);
        } catch (err) {
          err.should.have.property('status', 409);
          err.should.have.property('message', 'TRIP.EXIST');
        }
      });
    });

    describe('.update()', () => {
      it('it should return updated trip', async () => {
        const mockName = `${tripEntry.name} East`;
        const newTrip = await TripService.update(`${tripEntry._id}`, { name: mockName });

        newTrip.toObject().should.have.all.keys(...Object.keys(global.patterns.Trip));
        newTrip.destination.should.be.equal(mockName);
      });

      it('it should throw 404 status for not existing trip', async () => {
        try {
          await TripService.update(`${adminEntry._id}`);
        } catch (err) {
          err.should.have.property('status', 404);
          err.should.have.property('message', 'TRIP.NOT.EXIST');
        }
      });

      it('it should throw 409 already used name', async () => {
        try {
          const secondTrip = await helpers.createTrip(helpers.dataClone(tripTemplate));
          await TripService.update(`${tripEntry._id}`, { name: secondTrip.destination });
        } catch (err) {
          err.should.have.property('status', 409);
          err.should.have.property('message', 'TRIP.DESTINATION.EXIST');
        }
      });
    });

    describe('.findOne()', () => {
      it('it should return only one tripe for given ID', async () => {
        const newTrip = await TripService.findOne(`${tripEntry._id}`);

        newTrip.toObject().should.have.all.keys(...Object.keys(global.patterns.Trip));
      });

      it('it should throw 404 status for not existing trip', async () => {
        try {
          await TripService.findOne(`${adminEntry._id}`);
        } catch (err) {
          err.should.have.property('status', 404);
          err.should.have.property('message', 'TRIP.NOT.EXIST');
        }
      });
    });

    describe('.getListOfTripsNames()', () => {
      beforeEach(async () => {
        await Trip.deleteMany();

        for (let i = 0; i < 10; i++)
          await helpers.createTrip(helpers.dataClone(tripTemplate));
      });

      it('it should return list of trips names', async () => {
        const names = await TripService.getListOfTripsNames();

        names.length.should.be.equal(10);
      });
    });

    describe('.findCRM()', () => {
      beforeEach(async () => {
        await Trip.deleteMany();
        await Ticket.deleteMany();

        for (let i = 0; i < 23; i++) {
          await helpers.createTrip(helpers.dataClone(tripTemplate));
        }
      });

      it('it should return list of all trips without tickets', async () => {
        for (let i = 0; i < 3; i++) {
          const { status, results } = await TripService.findCRM(i, 10);

          status.should.have.all.keys('total', 'done', 'offset');
          results.length.should.be.equal(i === 2 ? 3 : 10);

          for (let trip of results) {
            trip.should.have.all.keys(...Object.keys(global.patterns.Trip));
          }
        }
      });
    });

    describe('.destroy()', () => {
      beforeEach(async () => {
        for (let i = 0; i < 5; i++) {
          const blockedQuantity = [];
          if(i % 2)
            blockedQuantity.push({
              owner: 'hash',
              quantity: 2
            });
          await helpers.createTicket({ ...ticket, direction: 'arrival', trip: `${tripEntry._id}`, blockedQuantity: blockedQuantity });
          await helpers.createTicket({ ...ticket, direction: 'departure', trip: `${tripEntry._id}`, blockedQuantity: blockedQuantity });
        }
      });
      it('it should set delete status of trip for given ID', async () => {
        await TripService.destroy(`${tripEntry._id}`);

        const deletedTrip = (await Trip.findById(`${tripEntry._id}`)).toObject();
        deletedTrip.deleted.should.be.true;
      });

      it('it should destroy one trip for given ID', async () => {
        const secondTripEntry = await helpers.createTrip(helpers.dataClone(trip));
        await TripService.destroy(`${secondTripEntry._id}`);

        const deletedTrip = await Trip.findById(`${secondTripEntry._id}`);
        should.not.exist(deletedTrip);
      });

      it('it should throw 404 error', async () => {
        try {
          await TripService.destroy(`${adminEntry._id}`);
        } catch (err) {
          err.should.have.property('status', 404);
          err.should.have.property('message', 'TRIP.NOT.EXIST');
        }
      });
    });
  });
};
