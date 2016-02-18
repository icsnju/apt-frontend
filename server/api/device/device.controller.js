/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/devices              ->  index
 * POST    /api/devices              ->  create
 * GET     /api/devices/:id          ->  show
 * PUT     /api/devices/:id          ->  update
 * DELETE  /api/devices/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Device from './device.model';

import net from 'net';

var HOST = '127.0.0.1';
var PORT = 6666;
var CHECKDEVICES = 'devices'

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Devices
export function index(req, res) {
  var client = new net.Socket();

  client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write(CHECKDEVICES);
  });

  client.on('data', function(data) {
    console.log('DATA: ' + data);
    var statusCode = 200;
    res.status(statusCode).send(data);
    client.destroy();
  });

  client.on('close', function() {
    console.log('Connection closed');
  });
}

// Gets a single Device from the DB
export function show(req, res) {
  Device.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Device in the DB
export function create(req, res) {
  Device.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Device in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Device.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Device from the DB
export function destroy(req, res) {
  Device.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
