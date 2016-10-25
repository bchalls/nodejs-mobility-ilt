'use strict';

describe('todos api', function() {
  var request, app;

  beforeEach(function() {
    app = require('express')();
    app.use('/tasks', require('lib/task-service.js'));

    request = require('supertest')(app);

    // var taskList = [{
    //   "username": "bhalls",
    //   "title": "Do Stuff",
    //   "description": "Get some things done",
    //   "createTs": 1477406741099,
    //   "updateTs": 1477406767367,
    //   "undefined": null
    // }, {
    //   "username": "notbhalls",
    //   "title": "Some other thing",
    //   "description": "Get some things done",
    //   "createTs": 1477407759126,
    //   "updateTs": 1477407759126
    // }]
  });

  describe('list (GET /)', function() {
    it('should return a list of records', function(done) {
      // TEST CODE HERE
      request.get('/tasks')
        .expect(200)
        .expect('content-type', /json/);

      done();
    });
  });
});
