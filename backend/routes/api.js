var express = require('express');
var router = express.Router();

var config = require('../config') 

// test endpoint
router.get('/test', (req, res, next) => res.send(config.api.testResponse))

module.exports = router;
