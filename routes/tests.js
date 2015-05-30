var express = require('express');
var router = express.Router();
var TestController = require('../controllers/testController');
var secured = require('../utils/auth');

module.exports = function(io) {	
	//routes
	router.post('/create', TestController.create(io));
	router.get('/my/:id', TestController.my);
	router.get('/get', TestController.get);
//	router.get('/get/:id', TestController.getOne);
	
	router.post('/submit', TestController.submit(io));
	router.get('/state/:id', TestController.setState(io));
//	router.get('/remove/:id', TestController.remove(io));
	
	
	
	return router;
};