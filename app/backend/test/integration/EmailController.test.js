'use strict';

module.exports = function (globals) {
  const {
    server,
    should,
    data: { support },
  } = globals;

  describe('EmailController', () => {
    describe('POST /support', () => {
      it('it should send email to support', async () => {
        const { status } = await server.post('/support').send(support);
        status.should.be.equal(200);
      });
    });
  });
};
