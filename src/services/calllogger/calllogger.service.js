// Initializes the `calllogger` service on path `/calllogger`
const createService = require('./calllogger.class.js');
const hooks = require('./calllogger.hooks');
const filters = require('./calllogger.filters');
const ioclient = require('socket.io-client');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  // Initialize socket to send messages
  const host = 'localhost'
  const port = app.get('port')
  const iotroom = app.get('iotroom');
  var url = 'http://' + host + ':' + port;
  var socket = ioclient(url);
  socket.on('connect', () => {
    socket.emit('join', {room: iotroom});
  });

  const options = {
    name: 'calllogger',
    paginate,
    socket: socket
  };

  // Initialize our service with any options it requires
  app.use('/calllogger', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('calllogger');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
