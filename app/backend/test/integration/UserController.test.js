'use strict';

module.exports = function (globals) {
  const {
    server,
    should,
    compare,
    helpers,
    models: { User },
    data: { administrator },
  } = globals;

  describe('UserController', () => {
    beforeEach(async () => {
      await User.deleteMany();

      await helpers.createUser(administrator);
    });

    describe('POST /login', () => {
      it('it should return token and user obj', async () => {
        const { status, body } = await server.post('/login').send({ email: administrator.email, password: administrator.password });
        status.should.be.equal(201);

        body.should.have.all.keys('token', 'user');
        body.token.should.not.be.empty;
        if(!compare(body.user, administrator)) throw Error('Returned user wasnt match');
      });
    });
  });
};
