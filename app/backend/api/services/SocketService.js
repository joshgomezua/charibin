'use strict';

const jwToken = require('./jwToken');

const SocketService = {
  clients: new Map(),
  async addClient (token, socket) {
    const tokenDecoded = await new Promise((resolve, reject) =>
      jwToken.verify(token, (err, decoded) =>
        err ? reject(err) : resolve(decoded)));
    socket.__userId = tokenDecoded.id;
    SocketService.clients.set(tokenDecoded.id, socket);
  },
  removeClient (socket) {
    SocketService.clients.delete(socket.__userId);
  },
  send (id, eventName, payload) {
    SocketService.clients.has(`${id}`) && SocketService.clients.get(`${id}`).emit(eventName, payload);
  },
};

module.exports = SocketService;
