/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/jobs              ->  index
 * POST    /api/jobs              ->  create
 * GET     /api/jobs/:id          ->  show
 * PUT     /api/jobs/:id          ->  update
 * DELETE  /api/jobs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Job from './job.model';
import net from 'net';
import fs from 'fs';

var HOST = '127.0.0.1';
var PORT = 6666;
var CHECKJOBS = 'jobs';
var SHAREPATH = '/Users/Tianchi/data/';


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

// Gets a list of Jobs
export function index(req, res) {
  // var jobs = [{
  //   "JobId": "1",
  //   "StartTime": "111",
  //   frame: "2222",
  //   filter: "3333",
  //   process: "30"
  // }];
  // var statusCode = 200;
  // res.status(statusCode).json(jobs);
  var client = new net.Socket();

  client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write(CHECKJOBS);
  });

  client.on('data', function(data) {
    //console.log('DATA: ' + data);
    var statusCode = 200;
    res.status(statusCode).send(data);
    client.destroy();
  });

  client.on('close', function() {
    console.log('Connection closed');
  });
}

// Gets a single Job from the DB
export function show(req, res) {
  Job.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Job
export function create(req, res) {

  //move test file
  var file = req.files.file;
  var timestamp = new Date().getTime();
  var tmpPath = file.path;
  var dirPath = SHAREPATH + timestamp;
  fs.mkdir(dirPath, function(err) {
    if (err) {
      console.log(err);
    }
  });
  var targetPath = dirPath + '/' + file.name;
  fs.rename(tmpPath, targetPath, function(err) {
    if (err) {
      console.log(err);
      fs.unlink(tmpPath, function(err) {
        if (err)
          console.log(err);
      });
    }
  })

  var statusCode = 200;
  res.status(statusCode).send('ok');
}

// Updates an existing Job in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Job.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Job from the DB
export function destroy(req, res) {
  Job.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
