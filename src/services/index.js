const calllogger = require('./calllogger/calllogger.service.js');
const testcalllogger = require('./testcalllogger/testcalllogger.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(calllogger);
  app.configure(testcalllogger);
};
