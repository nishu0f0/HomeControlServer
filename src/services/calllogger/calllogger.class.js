/* eslint-disable no-unused-vars */
class Service {
  
  constructor (options) {
    this.options = options || {};
    if(options.socket) {
      this.socket = options.socket;
    }
  }

  find (params) {
    this.sendMessage('find called');
    return Promise.resolve([]);
  }

  get (id, params) {
    this.sendMessage('get called');
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create (data, params) {
    this.sendMessage('create called');
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update (id, data, params) {
    sendMessage('update called');
    return Promise.resolve(data);
  }

  patch (id, data, params) {
    sendMessage('patch called');
    return Promise.resolve(data);
  }

  remove (id, params) {
    sendMessage('remove called');
    return Promise.resolve({ id });
  }

  sendMessage(message) {
    if(this.socket && message) {
      this.socket.emit('message', message);
    }
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
