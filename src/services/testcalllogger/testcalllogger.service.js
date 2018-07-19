// Initializes the `testcalllogger` service on path `/testcalllogger`
const createService = require('./testcalllogger.class.js');
const hooks = require('./testcalllogger.hooks');
const filters = require('./testcalllogger.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'testcalllogger',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/testcalllogger', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('testcalllogger');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
