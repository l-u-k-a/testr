var express = require('express');
var router = express.Router();
var CollectionController = require('../controllers/collectionController');
var secured = require('../utils/auth');

module.exports = function(io) {	
	//routes
	router.post('/roles', secured, CollectionController.roles.post);
	router.get('/roles', CollectionController.roles.get);
	
	return router;
};