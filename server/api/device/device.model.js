'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var DeviceSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Device', DeviceSchema);
