const assert = require('assert');
const app = require('../../src/app');

describe('\'calllogger\' service', () => {
  it('registered the service', () => {
    const service = app.service('calllogger');

    assert.ok(service, 'Registered the service');
  });
});
