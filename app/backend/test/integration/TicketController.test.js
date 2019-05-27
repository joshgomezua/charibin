'use strict';

module.exports = function (globals) {
  const {
    server,
    should,
    helpers,
    services: { TicketService },
    models: { User, Trip, Ticket },
    data: { trip, administrator, ticket, buyerInfo },
    dataTemplate: { trip: tripTemplate },
  } = globals;

  describe('TicketController', () => {
    let administratorUser;
    let administratorToken;
    let tripEntry;
    let ticketEntry;

    beforeEach(async () => {
      await User.deleteMany();
      await Ticket.deleteMany();
      await Trip.deleteMany();

      administratorUser = await helpers.createUser(administrator);
      administratorToken = await helpers.getToken(administratorUser);
      tripEntry = await helpers.createTrip(trip);
      ticketEntry = await helpers.createTicket({ ...ticket, trip: `${tripEntry._id}` });
    });


    describe('POST /ticket', () => {
      it('it should return created ticket', async () => {
        const { status, body } = await
        server
          .post('/ticket')
          .set('token', administratorToken)
          .send({ ...ticket, date: { start: Date.now(), end: Date.now() }, trip: tripEntry._id });

        status.should.be.equal(201);
        body.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)), 'updated');
      });

      it('it should throw error for guest', async () => {
        const { status } = await
        server
          .post('/ticket')
          .send({ ...ticket, date: { start: Date.now(), end: Date.now() }, trip: `${tripEntry._id}` });

        status.should.be.equal(400);
      });
    });

    describe('POST /ticket/book', () => {
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

      it('it should book trips', async () => {
        const { status, body } = await
        server
          .post('/ticket/book')
          .send({
            quantity: 2,
            trips: [
              { id: trips[0]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
              { arrivalTicket: tickets[8].arrivalTicket._id, departureTicket: tickets[8].departureTicket._id },
              { id: trips[2]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
              { arrivalTicket: tickets[16].arrivalTicket._id, departureTicket: tickets[16].departureTicket._id },
              { id: trips[4]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() }
            ]
          });

        status.should.be.equal(201);
        body.should.have.property('owner');
        body.owner.should.to.be.a('string');
      });

      it('it should throw error for corrupted data', async () => {
        const { status } = await
        server
          .post('/ticket/book')
          .send({
            quantity: 2,
            trips: [
              { id: trips[0]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
              { arrivalTicket: tickets[1].arrivalTicket._id, departureTicket: tickets[1].departureTicket._id },
              { id: trips[2]._id, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() },
              { arrivalTicket: tickets[3].arrivalTicket._id, departureTicket: tickets[3].departureTicket._id },
              { id: 123, dateStart: new Date('2020-01-01').getTime(), dateEnd: new Date('2020-01-10').getTime() }
            ]
          });

        status.should.be.equal(400);
      });
    });

    describe('POST /ticket/unbook', () => {
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
        const { status } = await
        server
          .post('/ticket/unbook')
          .send({ owner, trips: [ trips[0]._id, trips[2]._id ] });

        status.should.be.equal(200);

        const unbookedTickets = await Ticket.find({
          trip: { $in: [ trips[0]._id, trips[2]._id ] },
          blockedQuantity: { $elemMatch: { owner } }
        });
        for (let ticket of unbookedTickets)
          for (let blocked of ticket.blockedQuantity)
            blocked.owner.should.be.not.equal(owner);
      });

      it('it should throw error for non-existing owner', async () => {
        const { status } = await
        server
          .post('/ticket/unbook')
          .send({ owner, trips: [ '123', trips[2]._id ] });

        status.should.be.equal(400);

        const unbookedTickets = await Ticket.find({
          trip: { $in: [ trips[0]._id, trips[2]._id ] },
          blockedQuantity: { $elemMatch: { owner } }
        });
        for (let ticket of unbookedTickets)
          for (let blocked of ticket.blockedQuantity)
            blocked.owner.should.be.equal(owner);
      });
    });

    describe('POST /ticket/buy', () => {
      let trips = [];
      let tickets = [];
      let bookingInfo;

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
        const { status } = await
        server
          .post('/ticket/buy')
          .send({ owner: bookingInfo.owner, creditCardToken: 'tok_visa', buyerInfo });

        status.should.to.be.equal(200);
      });

      it('it should throw error for ', async () => {
        await TicketService.unbook({ owner: bookingInfo.owner, trips: [ trips[0]._id, trips[2]._id ] });

        const { status } = await
        server
          .post('/ticket/buy')
          .send({ owner: bookingInfo.owner, creditCardToken: 'tok_chargeCustomerFail', buyerInfo });


        status.should.be.equal(400);
      });
    });

    describe('PUT /ticket/:id', () => {
      it('it should return updated ticket', async () => {
        const { status, body } = await
        server
          .put(`/ticket/${ticketEntry._id}`)
          .set('token', administratorToken)
          .send({ quantity: ticketEntry.quantity + 7 });

        body.quantity.should.be.equal(ticketEntry.quantity  + 7);
        status.should.be.equal(200);
        body.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
      });

      it('it should return not modified object for guest', async () => {
        const { status, body } = await
        server
          .put(`/ticket/${ticketEntry._id}`)
          .send({ quantity: ticketEntry.quantity + 7 });

        body.quantity.should.be.equal(ticketEntry.quantity);
        status.should.be.equal(200);
        body.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
      });

      it('it should throw error for malformed ID', async () => {
        const { status } = await
        server
          .put('/ticket/asd');

        status.should.be.equal(400);
      });
    });

    describe('GET /ticket/:id', () => {
      it('it should return one ticket', async () => {
        const { status, body } = await
        server
          .get(`/ticket/${ticketEntry._id}`)
          .set('token', administratorToken);

        status.should.be.equal(200);
        body.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
      });

      it('it should throw error for malformed ID', async () => {
        const { status } = await
        server
          .get('/ticket/asd')
          .set('token', administratorToken);

        status.should.be.equal(400);
      });

      it('it should throw error for not Administartor user', async () => {
        const { status } = await
        server
          .get(`/ticket/${ticketEntry._id}`);

        status.should.be.equal(403);
      });
    });

    describe('GET /dashboard/ticket/:page/:limit/:priceStart/:priceEnd/:dateStart/:dateEnd/:quantity', () => {
      beforeEach(async () => {
        await Trip.deleteMany();
        await Ticket.deleteMany();

        const trips = [];

        for (let i = 0; i < 3; i++)
          trips.push(await helpers.createTrip(helpers.dataClone({ ...trip, price: 300 })));

        for (let i = 0; i < 3; i++)
          trips.push(await helpers.createTrip(helpers.dataClone({ ...trip, price: 500 })));

        for (let i = 0; i < 3; i++)
          trips.push(await helpers.createTrip(helpers.dataClone({ ...trip, price: 700 })));

        for (let i = 0; i < 3; i++)
          trips.push(await helpers.createTrip(helpers.dataClone({ ...trip, price: 900 })));


        for (const trip of trips) {
          for (let i = 0; i < 2; i++) {
            await helpers.createTicket({
              ...ticket,
              quantity: 2,
              date: {
                start: new Date('2020-01-01 09:00:00').getTime(),
                end: new Date('2020-01-01 12:00:00').getTime()
              },
              direction: 'arrival',
              trip: trip._id
            });
            await helpers.createTicket({
              ...ticket,
              quantity: 2,
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
              quantity: 3,
              date: {
                start: new Date('2020-03-01 09:00:00').getTime(),
                end: new Date('2020-03-01 12:00:00').getTime()
              },
              direction: 'arrival',
              trip: trip._id
            });
            await helpers.createTicket({
              ...ticket,
              quantity: 3,
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

      it('it should return list of all avaible tickets grouped by trip', async () => {
        for (let i = 0; i < 3; i++) {
          const { status: resStatus, body } = await
          server
            .get(`/dashboard/ticket/${i}/4/0/0/0/0/0`);

          resStatus.should.be.equal(200);
          body.length.should.be.equal(4);

          for (let trip of body) {
            trip.should.have.all.keys(...Object.keys(global.patterns.Trip).filter(x => !['fake', 'active', '__v', 'createdAt', 'deleted'].includes(x)));
            for (let ticket of trip.tickets) {
              trip.tickets.length.should.be.equal(12);
              ticket.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
            }
          }
        }
      });

      it('it should throw error for malformed params', async () => {
        const { status } = await
        server
          .get('/dashboard/ticket/a/b/c/d/e/f/g');

        status.should.be.equal(400);
      });
    });

    describe('GET /ticket/:dateStart/:dateEnd', () => {
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

      it('it should return list of tickets', async () => {
        for (let i = 0; i < 5; i++) {
          const [dateStart, dateEnd] = [new Date(`2020-0${i + 1}-01 00:00:00`).getTime(), new Date(`2020-0${i + 1}-20 00:00:00`).getTime()];
          const { status, body } = await
          server
            .get(`/ticket/${dateStart}/${dateEnd}`)
            .set('token', administratorToken);

          status.should.be.equal(200);
          body.length.should.be.equal(10);

          for (let ticket of body) {
            ticket.should.have.all.keys(...Object.keys(global.patterns.Ticket).filter(x => !['repeat'].includes(x)));
          }
        }
      });

      it('it should throw error for malformed params', async () => {
        const { status } = await
        server
          .get('/ticket/a/b')
          .set('token', administratorToken);

        status.should.be.equal(400);
      });

      it('it should throw error for not Administartor user', async () => {
        const { status } = await
        server
          .get('/ticket/0/10');

        status.should.be.equal(400);
      });
    });

    describe('DEL /ticket/:id', () => {
      it('it should delete ticket', async () => {
        const { status } = await
        server
          .del(`/ticket/${ticketEntry._id}`)
          .set('token', administratorToken);

        status.should.be.equal(200);
        const deletedTicket = await Ticket.findById(`${ticketEntry._id}`);
        should.not.exist(deletedTicket);
      });

      it('it should throw 403 for non Administartor user', async () => {
        const { status } = await
        server
          .del(`/ticket/${ticketEntry._id}`);

        status.should.be.equal(403);
      });
    });
  });
};
