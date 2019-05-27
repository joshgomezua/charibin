'use strict';

module.exports = function (globals) {
  const {
    server,
    should,
    helpers,
    models: { User, Ticket, Trip },
    data: { trip, administrator },
    dataTemplate: { trip: tripTemplate },
  } = globals;

  describe('TripController', () => {
    let administratorUser;
    let administratorToken;
    let tripEntry;

    beforeEach(async () => {
      await User.deleteMany();
      await Trip.deleteMany();
      await Ticket.deleteMany();

      administratorUser = await helpers.createUser(administrator);
      administratorToken = await helpers.getToken(administratorUser);
      tripEntry = await helpers.createTrip(trip);
    });;


    describe('POST /trip', () => {
      it('it should return created trip', async () => {
        const { status, body } = await
        server
          .post('/trip')
          .set('token', administratorToken)
          .send(helpers.dataClone(tripTemplate));

        status.should.be.equal(201);
        body.should.have.all.keys(...Object.keys(global.patterns.Trip));
      });

      it('it should throw error for guest', async () => {
        const { status } = await
        server
          .post('/trip')
          .send(helpers.dataClone(tripTemplate));

        status.should.be.equal(400);
      });
    });

    describe('PUT /trip/:id', () => {
      it('it should return updated trip', async () => {
        const { status, body } = await
        server
          .put(`/trip/${tripEntry._id}`)
          .set('token', administratorToken)
          .send({ name: 'Test name' });

        body.name.should.be.equal('Test name');
        status.should.be.equal(200);
        body.should.have.all.keys(...Object.keys(global.patterns.Trip));
      });

      it('it should return not modified object for guest', async () => {
        const { status, body } = await
        server
          .put(`/trip/${tripEntry._id}`)
          .send({ name: 'Test name' });

        body.name.should.be.equal(tripEntry.name);
        status.should.be.equal(200);
        body.should.have.all.keys(...Object.keys(global.patterns.Trip));
      });

      it('it should throw error for malformed ID', async () => {
        const { status } = await
        server
          .put('/trip/asd')
          .send({ name: 'Test name' });

        status.should.be.equal(400);
      });
    });

    describe('GET /trip/:id', () => {
      it('it should return one trip', async () => {
        const { status, body } = await
        server
          .get(`/trip/${tripEntry._id}`)
          .set('token', administratorToken);

        status.should.be.equal(200);
        body.should.have.all.keys(...Object.keys(global.patterns.Trip));
      });

      it('it should throw error for malformed ID', async () => {
        const { status } = await
        server
          .get('/trip/asd')
          .set('token', administratorToken);

        status.should.be.equal(400);
      });

      it('it should throw error for not Administartor user', async () => {
        const { status } = await
        server
          .get(`/trip/${tripEntry._id}`);

        status.should.be.equal(403);
      });
    });

    describe('GET /tripnames', () => {
      beforeEach(async () => {
        await Trip.deleteMany();

        for (let i = 0; i < 10; i++)
          await helpers.createTrip(helpers.dataClone(tripTemplate));
      });

      it('it should return list of trips names', async () => {
        const { status, body } = await
        server
          .get('/tripnames')
          .set('token', administratorToken);;

        status.should.be.equal(200);
        body.length.should.be.equal(10);
      });

      it('it should throw error for not Administartor user', async () => {
        const { status } = await
        server
          .get('/tripnames');

        status.should.be.equal(403);
      });
    });

    describe('GET /trip/:page/:limit', () => {
      beforeEach(async () => {
        await Trip.deleteMany();
        await Ticket.deleteMany();

        for (let i = 0; i < 23; i++) {
          await helpers.createTrip(helpers.dataClone({ ...trip }));
        }
      });

      it('it should return list of trips', async () => {
        for (let i = 0; i < 3; i++) {
          const { status: resStatus, body: { results, status } } = await
          server
            .get(`/trip/${i}/10`)
            .set('token', administratorToken);

          resStatus.should.be.equal(200);
          status.should.have.all.keys('total', 'done', 'offset');
          results.length.should.be.equal(i === 2 ? 3 : 10);

          for (let trip of results) {
            trip.should.have.all.keys(...Object.keys(global.patterns.Trip));
          }
        }
      });

      it('it should throw error for malformed params', async () => {
        const { status } = await
        server
          .get('/trip/a/b')
          .set('token', administratorToken);

        status.should.be.equal(400);
      });

      it('it should throw error for not Administartor user', async () => {
        const { status } = await
        server
          .get('/trip/0/10');

        status.should.be.equal(403);
      });
    });

    describe('DEL /trip/:page/:limit', () => {
      it('it should delete trip', async () => {
        const { status } = await
        server
          .del(`/trip/${tripEntry._id}`)
          .set('token', administratorToken);

        status.should.be.equal(200);
        const deletedTrip = await Trip.findById(`${tripEntry._id}`);
        should.not.exist(deletedTrip);
      });

      it('it should throw 403 for non Administartor user', async () => {
        const { status } = await
        server
          .del(`/trip/${tripEntry._id}`);

        status.should.be.equal(403);
      });
    });
  });
};
