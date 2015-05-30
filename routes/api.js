var express = require('express');
var router = express.Router();
var ApiController = require('../controllers/apiController');

module.exports = function(io) {
	router.get('/', ApiController.help);
	return router;
};