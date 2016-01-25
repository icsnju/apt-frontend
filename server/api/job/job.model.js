'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var JobSchema = new mongoose.Schema({
  id: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Job', JobSchema);
