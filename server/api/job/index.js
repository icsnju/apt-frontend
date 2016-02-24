'use strict';

var express = require('express');
var controller = require('./job.controller');
var multiparty = require('connect-multiparty');

var router = express.Router();
var multipartyMiddleware = multiparty();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', multipartyMiddleware, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
