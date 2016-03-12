'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var JobSchema = new mongoose.Schema({
  jobid: String,
  starttime: String,
  framekind: String,
  filterkind: String,
  status: String
});

export default mongoose.model('Job', JobSchema);
