var express = require('express');
var router = express.Router();
var AccountController = require('../controllers/accountController');
var secured = require('../utils/auth');

module.exports = function(io) {	
	//routes
	router.post('/authenticate', AccountController.authenticate(io));
	router.post('/create', AccountController.create(io));
	router.post('/remove/:id', AccountController.remove(io));
	router.post('/update/:id', AccountController.update(io));		
	router.get('/users', secured, AccountController.users);
	router.get('/get', secured, AccountController.get);
	router.get('/users/:id', AccountController.user);
	
	return router;
};