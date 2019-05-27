'use strict';

module.exports = function (globals) {
  const {
    should,
    compare,
    helpers,
    services: { UserService },
    models: { User },
    data: { administrator }
  } = globals;

  describe('UserService', () => {
    beforeEach(async () => {
      await User.deleteMany();

      await helpers.createUser(administrator);
    });

    describe('.login()', () => {
      it('it should login use and return token and user object', async () => {
        const data = await UserService.login({ email: administrator.email, password: administrator.password });

        data.should.have.all.keys('token', 'user');
        data.token.should.not.be.empty;
        if(!compare(data.user, administrator)) throw Error('Returned user wasnt match');
      });

      it('it should throw 404 status', async () => {
        try {
          await UserService.login({ email: `${administrator.email}a`, password: administrator.password });
        } catch (err) {
          err.should.have.property('status', 404);
          err.should.have.property('message', 'USER.EMAIL.NOT_FOUND');
        }
      });

      it('it should throw 401 status', async () => {
        try {
          await UserService.login({ email: administrator.email, password: `${administrator.password}a` });
        } catch (err) {
          err.should.have.property('status', 401);
          err.should.have.property('message', 'USER.PASSWORD.INVALID');
        }
      });
    });
  });
};
