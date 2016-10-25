'use strict';

var express = require('express');
var db = require('./db-service');

// var todo = {
//   username: "string",
//   createTs: "number",
//   updateTS: "number",
//   title: "string",
//   dec: "string"
// }

function taskService() {
  var router = new express.Router();
  router.use(require('body-parser').json());

  // GET ?username=username
  router.get('/', function(req, res, next) {
    var username = req.query.username;
    var result = {};
    var key = 'username';

    if (username == null) {
      result = db.getTask(null, null);
    } else {
      result = db.getTask(key, username);
    }
    result.then(function(ret) {
      res.json(ret);
    }).catch(next);
  });

  router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var username = req.query.username;
    if (username == null && id != null) {
      var key = 'guid';

      var result = db.getTask(key, id);

      result.then(function(ret) {
        res.json(ret);
      }).catch(next);
    }
  });

  router.post('/', function(req, res, next) {
    var result = db.addTask(req.body);
    result.then(function(ret) {
      res.json(ret);
    }).catch(next);

  });

  router.delete('/:id', function(req, res, next) {
    var result = db.removeTask(req.params.id);
    result.then(function(ret) {
      res.json(ret);
    }).catch(next);
  })

  router.put('/:id', function(req, res, next) {
    var result = db.updateTask(req.params.id, req.body.key, req.body.value);
    result.then(function(ret) {
      res.json(ret);
    }).catch(next);
  })

  return router;
}

module.exports = taskService;
