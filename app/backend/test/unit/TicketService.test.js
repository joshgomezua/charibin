'use strict';

module.exports = function (globals) {
  const {
    should,
    helpers,
    services: { TicketService },
    models: { User, Ticket, Trip, TicketOwner },
    data: { trip, ticket, administrator, buyerInfo },
    dataTemplate: { trip: tripTemplate }
  } = globals;

  describe('TicketService', () => {
    let tripEntry;
    let ticketEntry;
    let adminEntry;

    beforeEach(async () => {
      await User.deleteMany();
      await Trip.deleteMany();
      await TicketOwner.deleteMany();
      await Ticket.deleteMany();

      tripEntry = await helpers.createTrip(trip);
      ticketEntry = await helpers.createTicket({ ...ticket, trip: `${tripEntry._id}` });
      adminEntry = await helpers.createUser(administrator);
    });

    describe('.create()', () => {
      it('it should return created ticket', async () => {
        const newTicket = await TicketService.create({ ...ticket, date: { start: Date.now(), end: Date.now() }, trip: `${tripEntry._id}` });

        newTicket.should.have.all.keys(
          ...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)), 'updated');
      });

      it('it should create recurring tickets', async () => {
        await Ticket.deleteMany();

        await TicketService
          .create({
            ...ticket,
            date: { start: new Date('01-09-2019 01:00:00').getTime(), end: new Date('01-09-2019 06:00:00').getTime() },
            trip: `${tripEntry._id}`,
            repeat: {
              dateEnd: new Date('01-30-2019').getTime(),
              days: [1,3,5]
            }
          });

        const tickets = await Ticket.countDocuments();
        tickets.should.be.equal(10);
      });

      it('it should create recurring tickets and notify on updated tickets', async () => {
        await Ticket.deleteMany();

        await helpers.createTicket({ ...ticket, date: { start: new Date('01-11-2019 01:00:00').getTime(), end: new Date('01-11-2019 06:00:00').getTime() }, trip: `${tripEntry._id}` });

        const messages = await TicketService
          .create({
            ...ticket,
            date: { start: new Date('01-09-2019 01:00:00').getTime(), end: new Date('01-09-2019 06:00:00').getTime() },
            trip: `${tripEntry._id}`,
            repeat: {
              dateEnd: new Date('01-30-2019').getTime(),
              days: [1,3,5]
            }
          });

        messages.should.have.property('updated', true);
        messages.should.have.property('dates');

        const tickets = await Ticket.countDocuments();
        tickets.should.be.equal(10);
      });
    });

    describe('.book()', () => {
      let trips = [];
      let tickets = [];
      beforeEach(async () => {
        trips = [];
        tickets = [];
        await Trip.deleteMany();
        await Ticket.deleteMany();


        for (let i = 0; i < 7; i++)
          trips.push(await helpers.createTrip(helpers.dataClone(tripTemplate)));

        for (const trip of trips) {
          for (let i = 0; i < 5; i++) {
            const arrivalTicket = await helpers.createTicket({
              ...helpers.dataClone(ticket),
              date: {
                start: new Date(`2020-01-0${1 + i} 09:00:00`).getTime(),
                end: new Date(`2020-01-0${1 + i} 12:00:00`).getTime()
              },
              direction: 'arrival',
              quantity: 6,
              trip: trip._id
            });

            const departureTicket = await helpers.createTicket({
              ...helpers.dataClone(ticket),
              date: {
                start: new Date(`2020-01-${10 + i} 09:00:00`).getTime(),
                end: new Date(`2020-01-${10 + i} 12:00:00`).getTime()
              },
              direction: 'departure',
              quantity: 6,
              trip: trip._id
            });
            tickets.push({ arrivalTicket, departureTicket });
          }
        }
      });

      it('it should return ownerHash and list of booked tickets for selection without sepecefic time', async () => {
        const ownerBillingInfo = await TicketService.book({
          quantity: 2,
          trips: [
            { id: trips[0]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[1].arrivalTicket._id, departureTicket: tickets[1].departureTicket._id },
            { id: trips[2]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[3].arrivalTicket._id, departureTicket: tickets[3].departureTicket._id },
            { id: trips[4]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() }
          ]
        });

        ownerBillingInfo.should.have.property('owner');
        ownerBillingInfo.owner.should.to.be.a('string');
        ownerBillingInfo.should.have.property('quantity');
        ownerBillingInfo.quantity.should.to.be.a('number');
        ownerBillingInfo.should.have.property('trips');
        ownerBillingInfo.trips.should.to.be.a('array');

        const arrivalTicket = await Ticket.findById(tickets[1].arrivalTicket._id);
        arrivalTicket.blockedQuantity.length.should.be.equal(1);
        arrivalTicket.blockedQuantity[0].owner.should.be.equal(ownerBillingInfo.owner);

        const departureTicket = await Ticket.findById(tickets[1].departureTicket._id);
        departureTicket.blockedQuantity.length.should.be.equal(1);
        departureTicket.blockedQuantity[0].owner.should.be.equal(ownerBillingInfo.owner);
      });

      it('it should bot book other trips if booking already called', async () => {
        const ownerBillingInfoOld = await TicketService.book({
          quantity: 2,
          trips: [
            { id: trips[0]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[1].arrivalTicket._id, departureTicket: tickets[1].departureTicket._id },
            { id: trips[2]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[3].arrivalTicket._id, departureTicket: tickets[3].departureTicket._id },
            { id: trips[4]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() }
          ]
        });

        const ownerBillingInfoNew = await TicketService.book({
          quantity: 2,
          ownerHash: ownerBillingInfoOld.owner,
          trips: [
            { id: trips[0]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[1].arrivalTicket._id, departureTicket: tickets[1].departureTicket._id },
            { id: trips[2]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[3].arrivalTicket._id, departureTicket: tickets[3].departureTicket._id },
            { id: trips[4]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() }
          ]
        });

        ownerBillingInfoNew.toObject().should.to.deep.equal(ownerBillingInfoOld.toObject());
      });

      it('it should throw error for non-existing ticket', async () => {
        try {
          await TicketService.book({
            quantity: 2,
            trips: [
              { id: trips[0]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
              { arrivalTicket: trips[0]._id, departureTicket: tickets[1].departureTicket._id },
              { id: trips[2]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
              { arrivalTicket: tickets[3].arrivalTicket._id, departureTicket: tickets[3].departureTicket._id },
              { id: trips[4]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() }
            ]
          });
        } catch (err) {
          err.should.have.property('status', 404);
          err.should.have.property('message', 'TICKET.ARRIVAL.NOT.EXIST');
        }
      });

      it('it should throw error for non-existing ticket in given date range', async () => {
        try {
          await TicketService.book({
            quantity: 2,
            trips: [
              { id: trips[0]._id, dateStart: new Date('2065-01-01').getTime(), dateEnd: new Date('2068-01-10').getTime() },
              { arrivalTicket: tickets[1].arrivalTicket._id, departureTicket: tickets[1].departureTicket._id },
              { id: trips[2]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
              { arrivalTicket: tickets[3].arrivalTicket._id, departureTicket: tickets[3].departureTicket._id },
              { id: trips[4]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() }
            ]
          });
        } catch (err) {
          err.should.have.property('status', 404);
          err.should.have.property('message', 'TICKET.ARRIVAL.NOT.EXIST%');
        }
      });
    });

    describe('.unbook()', () => {
      let trips = [];
      let tickets = [];
      let owner;
      beforeEach(async () => {
        trips = [];
        tickets = [];
        await Trip.deleteMany();
        await Ticket.deleteMany();


        for (let i = 0; i < 7; i++)
          trips.push(await helpers.createTrip(helpers.dataClone(tripTemplate)));

        for (const trip of trips) {
          for (let i = 0; i < 5; i++) {
            const arrivalTicket = await helpers.createTicket({
              ...helpers.dataClone(ticket),
              date: {
                start: new Date(`2020-01-0${1 + i} 09:00:00`).getTime(),
                end: new Date(`2020-01-0${1 + i} 12:00:00`).getTime()
              },
              direction: 'arrival',
              quantity: 6,
              trip: trip._id
            });

            const departureTicket = await helpers.createTicket({
              ...helpers.dataClone(ticket),
              date: {
                start: new Date(`2020-01-${10 + i} 09:00:00`).getTime(),
                end: new Date(`2020-01-${10 + i} 12:00:00`).getTime()
              },
              direction: 'departure',
              quantity: 6,
              trip: trip._id
            });
            tickets.push({ arrivalTicket, departureTicket });
          }
        }

        owner = (await TicketService.book({
          quantity: 2,
          trips: [
            { id: trips[0]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[8].arrivalTicket._id, departureTicket: tickets[8].departureTicket._id },
            { id: trips[2]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[16].arrivalTicket._id, departureTicket: tickets[16].departureTicket._id },
            { id: trips[4]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() }
          ]
        })).owner;
      });

      it('it should unbook given trips', async () => {
        const ownerBillingInfo = await TicketService.unbook({ owner, trips: [ trips[0]._id, trips[2]._id ] });
        ownerBillingInfo.trips.length.should.be.equal(5);

        for (let reserved of ownerBillingInfo.trips) {
          if(!reserved.deselected) {
            const bookedArrivalTicket = await Ticket.findOne({ _id: reserved.arrivalTicket , blockedQuantity: { $elemMatch: { owner } } });
            bookedArrivalTicket.toObject().should.to.be.an('object');
            const bookedDepartureTicket = await Ticket.findOne({ _id: reserved.departureTicket , blockedQuantity: { $elemMatch: { owner } } });
            bookedDepartureTicket.toObject().should.to.be.an('object');
          } else {
            reserved.deselected.should.to.be.equal(true);
          }
        }
      });

      it('it should throw 404 error for non-existing owner', async () => {
        try {
          await TicketService.unbook({ owner: '123', trips: [ trips[0]._id, trips[2]._id ] });
        } catch (err) {
          err.should.have.property('status', 404);
          err.should.have.property('message', 'TICKET.OWNER.NOT.EXIST');
        }

      });
    });

    describe('.buy()', () => {
      let trips = [];
      let tickets = [];
      let bookingInfo;

      beforeEach(async () => {
        trips = [];
        tickets = [];
        await Trip.deleteMany();
        await TicketOwner.deleteMany();
        await Ticket.deleteMany();

        for (let i = 0; i < 7; i++)
          trips.push(await helpers.createTrip(helpers.dataClone(tripTemplate)));

        for (const trip of trips) {
          for (let i = 0; i < 5; i++) {
            const arrivalTicket = await helpers.createTicket({
              ...helpers.dataClone(ticket),
              date: {
                start: new Date(`2020-01-0${1 + i} 09:00:00`).getTime(),
                end: new Date(`2020-01-0${1 + i} 12:00:00`).getTime()
              },
              direction: 'arrival',
              quantity: 99,
              trip: trip._id
            });

            const departureTicket = await helpers.createTicket({
              ...helpers.dataClone(ticket),
              date: {
                start: new Date(`2020-01-${10 + i} 09:00:00`).getTime(),
                end: new Date(`2020-01-${10 + i} 12:00:00`).getTime()
              },
              direction: 'departure',
              quantity: 99,
              trip: trip._id
            });
            tickets.push({ arrivalTicket, departureTicket });
          }
        }

        bookingInfo = await TicketService.book({
          quantity: 2,
          trips: [
            { id: trips[0]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[8].arrivalTicket._id, departureTicket: tickets[8].departureTicket._id },
            { id: trips[2]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
            { arrivalTicket: tickets[16].arrivalTicket._id, departureTicket: tickets[16].departureTicket._id },
            { id: trips[4]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() }
          ]
        });

        bookingInfo.trips = await helpers.populateTrips(bookingInfo.trips);
      });

      it('it should buy trip', async () => {
        await TicketService.unbook({ owner: bookingInfo.owner, trips: [ trips[0]._id, trips[2]._id ] });
        const selectedTrip = await TicketService.buy({ owner: bookingInfo.owner, creditCardToken: 'tok_visa', buyerInfo });

        // Check if amount of charge is equal of final cost calculated by system
        const charge = await helpers.findChargeById(selectedTrip.chargeId);
        charge.amount.should.to.be.equal(+(selectedTrip.finalCost * 100).toFixed(0));
        charge.currency.should.to.be.equal('gbp');

        // Check if blockedQuantity are cleared correctly for arrivalTicket
        const arrivalTicket = await Ticket.findById(selectedTrip.arrivalTicket._id);
        for (let reservation of arrivalTicket.blockedQuantity) reservation.toObject().owner.should.to.be.not.equal(bookingInfo.owner);

        const departureTicket = await Ticket.findById(selectedTrip.departureTicket._id);
        for (let reservation of departureTicket.blockedQuantity) reservation.toObject().owner.should.to.be.not.equal(bookingInfo.owner);

        // Check if quantity of tickets are substracted correctly
        const originalTrip = bookingInfo.trips.find(x => `${x.arrivalTicket._id}` === `${selectedTrip.arrivalTicket._id}`);
        arrivalTicket.quantity.should.to.be.equal(originalTrip.arrivalTicket.quantity);
        departureTicket.quantity.should.to.be.equal(originalTrip.departureTicket.quantity);

      });

      it('it should throw error for invalid credit card', async () => {
        await TicketService.unbook({ owner: bookingInfo.owner, trips: [ trips[0]._id, trips[2]._id ] });
        try {
          await TicketService.buy({ owner: bookingInfo.owner, creditCardToken: 'tok_chargeCustomerFail', buyerInfo });
        } catch (err) {
          err.should.have.property('status', 'stripe');
          err.should.have.property('message');

          const billing = await helpers.getOwnerBillingInfoById(bookingInfo._id);
          billing.trips = await helpers.populateTrips(billing.trips);

          for (let reservation of billing.trips) {
            if(!reservation.deselected) {
              const reservedArrivalTicket = reservation.arrivalTicket.blockedQuantity.find(x => x.owner === bookingInfo.owner );
              reservedArrivalTicket.owner.should.to.be.equal(bookingInfo.owner);
            }
          }
        }
      });
    });

    describe('.update()', () => {
      it('it should return updated ticket', async () => {
        const newTicket = await TicketService.update(`${ticketEntry._id}`, { active: !ticketEntry.active });

        newTicket.toObject().should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));

        newTicket.active.should.be.equal(!ticketEntry.active);
      });

      it('it should throw 404 status for not existing ticket', async () => {
        try {
          await TicketService.update(`${adminEntry._id}`, {});
          throw Error('Ticket updated');
        } catch (err) {
          err.should.have.property('status', 404);
          err.should.have.property('message', 'TICKET.NOT.EXIST');
        }
      });
    });

    describe('.findOne()', () => {
      it('it should return only one ticket for given ID', async () => {
        const newTicket = await TicketService.findOne(`${ticketEntry._id}`);

        newTicket.toObject().should.have.all.keys(
          ...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
      });

      it('it should throw 404 status for not existing ticket', async () => {
        try {
          await TicketService.findOne(`${adminEntry._id}`);
          throw Error('Ticket updated');
        } catch (err) {
          err.should.have.property('status', 404);
          err.should.have.property('message', 'TICKET.NOT.EXIST');
        }
      });
    });

    describe('.findDashboard()', () => {
      beforeEach(async () => {
        await Trip.deleteMany();
        await Ticket.deleteMany();

        const trips = [];

        for (let i = 0; i < 3; i++)
          trips.push(await helpers.createTrip({ ...helpers.dataClone(tripTemplate), price: 300 }));

        for (let i = 0; i < 3; i++)
          trips.push(await helpers.createTrip({ ...helpers.dataClone(tripTemplate), price: 500 }));

        for (let i = 0; i < 3; i++)
          trips.push(await helpers.createTrip({ ...helpers.dataClone(tripTemplate), price: 700 }));

        for (let i = 0; i < 3; i++)
          trips.push(await helpers.createTrip({ ...helpers.dataClone(tripTemplate), price: 900 }));


        for (const trip of trips) {
          for (let i = 0; i < 2; i++) {
            await helpers.createTicket({
              ...ticket,
              quantity: 3,
              date: {
                start: new Date('2020-01-01 09:00:00').getTime(),
                end: new Date('2020-01-01 12:00:00').getTime()
              },
              direction: 'arrival',
              trip: trip._id
            });
            await helpers.createTicket({
              ...ticket,
              quantity: 3,
              date: {
                start: new Date('2020-02-01 09:00:00').getTime(),
                end: new Date('2020-02-01 12:00:00').getTime()
              },
              direction: 'departure',
              trip: trip._id
            });
          }

          for (let i = 0; i < 2; i++) {
            await helpers.createTicket({
              ...ticket,
              quantity: 2,
              date: {
                start: new Date('2020-03-01 09:00:00').getTime(),
                end: new Date('2020-03-01 12:00:00').getTime()
              },
              direction: 'arrival',
              trip: trip._id
            });
            await helpers.createTicket({
              ...ticket,
              quantity: 2,
              date: {
                start: new Date('2020-04-01 09:00:00').getTime(),
                end: new Date('2020-04-01 12:00:00').getTime()
              },
              direction: 'departure',
              trip: trip._id
            });
          }

          for (let i = 0; i < 2; i++) {
            await helpers.createTicket({
              ...ticket,
              quantity: 5,
              date: {
                start: new Date('2020-05-01 09:00:00').getTime(),
                end: new Date('2020-05-01 12:00:00').getTime()
              },
              direction: 'arrival',
              trip: trip._id
            });
            await helpers.createTicket({
              ...ticket,
              quantity: 5,
              date: {
                start: new Date('2020-06-01 09:00:00').getTime(),
                end: new Date('2020-06-01 12:00:00').getTime()
              },
              direction: 'departure',
              trip: trip._id
            });
          }
        }
      });

      it('it should return list of all tickets avaible grouped by trip', async () => {
        for (let i = 0; i < 3; i++) {
          const data = await TicketService.findDashboard({ page: i, limit: 4 });
          data.length.should.be.equal(4);

          for (let trip of data) {
            trip.should.have.all.keys(...Object.keys(global.patterns.Trip).filter(x => !['fake', 'active', '__v', 'createdAt', 'deleted'].includes(x)));

            for (let ticket of trip.tickets) {
              trip.tickets.length.should.be.equal(12);
              ticket.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
            }
          }
        }
      });

      it('it should return list of all tickets filtred by provided date', async () => {
        for (let i = 0; i < 3; i++) {
          const data = await
          TicketService
            .findDashboard({
              page: i,
              limit: 4,
              dateStart: new Date('2020-04-23').getTime(),
              dateEnd: new Date('2020-07-01').getTime()
            });

          data.length.should.be.equal(4);

          for (let trip of data) {
            trip.should.have.all.keys(...Object.keys(global.patterns.Trip).filter(x => !['fake', 'active', '__v', 'createdAt', 'deleted'].includes(x)));

            for (let ticket of trip.tickets) {
              trip.tickets.length.should.be.equal(4);
              ticket.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
            }
          }
        }
      });

      it('it should return list of all tickets filtred by provided price', async () => {
        const data = await
        TicketService
          .findDashboard({
            page: 0,
            limit: 10,
            priceStart: 500,
            priceEnd: 700
          });

        data.length.should.be.equal(6);

        for (let trip of data) {
          trip.should.have.all.keys(...Object.keys(global.patterns.Trip).filter(x => !['fake', 'active', '__v', 'createdAt', 'deleted'].includes(x)));

          for (let ticket of trip.tickets) {
            trip.tickets.length.should.be.equal(12);
            ticket.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
          }
        }
      });

      it('it should return list of all tickets filtred by provided price and date', async () => {
        const data = await
        TicketService
          .findDashboard({
            page: 0,
            limit: 10,
            priceStart: 500,
            priceEnd: 700,
            dateStart: new Date('2020-04-23').getTime(),
            dateEnd: new Date('2020-07-01').getTime()
          });

        data.length.should.be.equal(6);

        for (let trip of data) {
          trip.should.have.all.keys(...Object.keys(global.patterns.Trip).filter(x => !['fake', 'active', '__v', 'createdAt', 'deleted'].includes(x)));

          for (let ticket of trip.tickets) {
            trip.tickets.length.should.be.equal(4);
            ticket.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
          }
        }
      });

      it('it should return list of all tickets filtred by provided quantity', async () => {
        const data = await
        TicketService
          .findDashboard({
            page: 0,
            limit: 100,
            quantity: 5
          });

        data.length.should.be.equal(12);

        for (let trip of data) {
          trip.should.have.all.keys(...Object.keys(global.patterns.Trip).filter(x => !['fake', 'active', '__v', 'createdAt', 'deleted'].includes(x)));

          for (let ticket of trip.tickets) {
            trip.tickets.length.should.be.equal(4);
            ticket.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
          }
        }
      });
    });

    describe('.findCRM()', () => {
      beforeEach(async () => {
        await Trip.deleteMany();
        await Ticket.deleteMany();

        for (let i = 0; i < 5; i++) {
          const newTrip = await helpers.createTrip(helpers.dataClone(tripTemplate));
          for (let j = 0; j < 5; j++) {
            await helpers.createTicket({
              ...ticket,
              date: {
                start: new Date(`2020-0${j + 1}-01 09:00:00`).getTime(),
                end: new Date(`2020-0${j + 1}-01 12:00:00`).getTime()
              },
              direction: 'arrival',
              trip: newTrip._id
            });
            await helpers.createTicket({
              ...ticket,
              date: {
                start: new Date(`2020-0${j + 1}-10 09:00:00`).getTime(),
                end: new Date(`2020-0${j + 1}-10 12:00:00`).getTime()
              },
              direction: 'departure',
              trip: newTrip._id
            });
          }
        }
      });

      it('it should return list of all tickets for CRM', async () => {
        for (let i = 0; i < 5; i++) {
          const [dateStart, dateEnd] = [new Date(`2020-0${i + 1}-01 00:00:00`).getTime(), new Date(`2020-0${i + 1}-20 00:00:00`).getTime()];
          const tickets = await TicketService.findCRM(dateStart, dateEnd);

          tickets.length.should.be.equal(10);

          for (let ticket of tickets)
            ticket.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
        }
      });
    });

    describe('.destroy()', () => {
      it('it should destroy one ticket for given ID', async () => {
        await TicketService.destroy(`${ticketEntry._id}`);

        const deletedTicket = await Ticket.findById(`${ticketEntry._id}`);
        should.not.exist(deletedTicket);

        const trip = await Trip.findById(`${tripEntry._id}`);
        trip.toObject().should.have.all.keys(...Object.keys(global.patterns.Trip));
      });

      it('it should destroy one ticket and trip marked to delete', async () => {
        await Trip.deleteMany();
        await Ticket.deleteMany();

        tripEntry = await helpers.createTrip({ ...trip, deleted: true });
        ticketEntry = await helpers.createTicket({ ...ticket, deleted: true , trip: `${tripEntry._id}` });
        await TicketService.destroy(`${ticketEntry._id}`);

        const deletedTicket = await Ticket.findById(`${ticketEntry._id}`);
        should.not.exist(deletedTicket);

        const deletedTrip = await Trip.findById(`${tripEntry._id}`);
        should.not.exist(deletedTrip);
      });

    });
  });
};
