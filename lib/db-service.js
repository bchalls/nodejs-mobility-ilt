'use strict';

var Promise = require('bluebird');
var db = Promise.promisify(require('fh-mbaas-api').db);
var collectionName = 'tasks';


module.exports.addTask = function(task) {
  task.createTs = Date.now();
  task.updateTs = Date.now();
  var options = {
    "act": "create",
    "type": collectionName,
    "fields": task
  };
  return db(options);
}

module.exports.getTask = function(key, value) {
  var options = {
    act: "list",
    type: collectionName
  };
  if (key == 'guid') {
    options.guid = value;
    options.act = "read";
  } else if (key == null && value == null) {
    options = {
      "act": "list",
      "type": collectionName
    };
  } else {
    options.eq = {};
    options.eq[key] = value;
  }
  console.log('Calling db with options: ' + JSON.stringify(options));
  return db(options);
}

module.exports.removeTask = function(guid) {
  var options = {
    "act": "delete",
    "type": collectionName,
    "guid": guid
  };
  return db(options);
}

module.exports.updateTask = function(guid, key, value) {
  var options = {
    "act": "read",
    "type": collectionName, // Entity/Collection name
    "guid": guid // Row/Entry ID
  };
  return db(options).then(function(ret) {
    console.log('Got this to update: ' + JSON.stringify(ret.fields));
    var entFields = ret.fields;
    entFields[key] = value;
    entFields.updateTs = Date.now();
    console.log('Updating: ' + JSON.stringify(entFields));
    var updateOptions = {
      "act": "update",
      "type": collectionName,
      "guid": guid,
      "fields": entFields
    };
    return db(updateOptions);
  });
}
