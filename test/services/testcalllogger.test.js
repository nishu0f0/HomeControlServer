const assert = require('assert');
const app = require('../../src/app');

describe('\'testcalllogger\' service', () => {
  it('registered the service', () => {
    const service = app.service('testcalllogger');

    assert.ok(service, 'Registered the service');
  });
});
