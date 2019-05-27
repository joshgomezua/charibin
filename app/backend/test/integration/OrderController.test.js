'use strict';

module.exports = function (globals) {
  const {
    server,
    helpers,
    models: { Order, User },
    data: { administrator, order },
  } = globals;

  describe('OrderController', () => {
    let administratorUser;
    let administratorToken;
    let orderEntry;

    beforeEach(async () => {
      await User.deleteMany();
      await Order.deleteMany();

      orderEntry = await new Order(order).save();
      administratorUser = await helpers.createUser(administrator);
      administratorToken = await helpers.getToken(administratorUser);
    });;


    describe('POST /order/:page/:limit/:sortField?/:sortOrder?', () => {
      it('it should return 403 if no token is supplied', async () => {
        const { status } = await server.get('/order/0/10');
        status.should.be.equal(403);
      });
      it('it should return 200 if token was supplied', async () => {
        const { status, body } = await server.get('/order/0/10').set('token', administratorToken);
        status.should.be.equal(200);
        body.should.be.an('object').that.has.all.keys(['results', 'status']);
        body.results.should.be.an('array').that.have.lengthOf(1);
        body.status.should.be.an('object').that.have.all.keys(['total', 'done', 'offset']);
        body.status.total.should.be.equal(1);
        body.status.done.should.be.equal(true);
        body.status.offset.should.be.equal(0);
      });
      it('it should return 400 if :page parameter is invalid', async () => {
        const invalidParams = ['-1', 'NaN', 'Infinity', '-Infinity'];
        for (const page of invalidParams) {
          const { status } = await server
            .get(`/order/${page}/10`)
            .set('token', administratorToken);
          status.should.be.equal(400);
        }
      });

      it('it should return 400 if :limit parameter is invalid', async () => {
        const invalidParams = ['-1', 'NaN', '10e-23', '0.9999', 'Infinity', '-Infinity', '0'];
        for (const limit of invalidParams) {
          const { status } = await server
            .get(`/order/0/${limit}`)
            .set('token', administratorToken);
          status.should.be.equal(400);
        }
      });

      it('it should return 400 if :sortField? parameter is invalid', async () => {
        const { status } = await server
          .get('/order/0/10/buyer')
          .set('token', administratorToken);
        status.should.be.equal(400);
      });

      it('it should only allow valid paths as a values of :sortField? parameter', async () => {
        const requests = [];
        Order.schema.eachPath((path) => requests.push(
          server.get(`/order/0/10/${path}`).set('token', administratorToken)
        ));
        for await (const { status } of requests) {
          status.should.be.equal(200);
        }
      });

      it('it should return 400 if :sortOrder? parameter is invalid', async () => {
        const { status } = await server
          .get('/order/0/10/_id/hightolow')
          .set('token', administratorToken);
        status.should.be.equal(400);
      });

      it('it should only allow ascending and descending values of :sortOrder? parameter', async () => {
        for (const dir of ['ascending', 'descending']) {
          const { status } = await server
            .get(`/order/0/10/_id/${dir}`)
            .set('token', administratorToken);
          status.should.be.equal(200);
        }
      });
    });

    describe('PATCH /order/:id', () => {
      it('it should return 403 if no token is supplied', async () => {
        const { status } = await server.patch(`/order/${orderEntry._id}`);
        status.should.be.equal(403);
      });
      it('it should return 200 if update was succesfull', async () => {
        const { status, body } = await server
          .patch(`/order/${orderEntry._id}`)
          .set('token', administratorToken)
          .send({ sent: true });
        status.should.be.equal(200);
        body.sent.should.be.equal(true);
      });
      it('it should return 400 if body is invalid', async () => {
        const { status } = await server
          .patch(`/order/${orderEntry._id}`)
          .set('token', administratorToken)
          .send({ sent: 1000 });
        status.should.be.equal(400);
      });
      it('it should return 400 if id is not mongo id', async () => {
        const { status } = await server
          .patch('/order/something')
          .set('token', administratorToken)
          .send({});
        status.should.be.equal(400);
      });
    });
  });
};
