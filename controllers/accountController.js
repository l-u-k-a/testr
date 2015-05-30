var User = require('../models/user');
var Response = require('../models/response');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/index');
var socketEvents = require('../utils/socketEvents');

//create a new user
exports.create = function(io) {
	return function(req, res) {
		var user = new User(req.body);
		user.username = req.body.privateNumber;
		user.password = req.body.privateNumber;
		
		
		user.save(function(err, result) {
			if(!err) {
				res.json(new Response(200, 'User created', result));
			} else {
				res.json(err);
			}
		});
	};
};

//get users
exports.users = function(req, res) {
	User.find(function(err, result) {
		if(!err) {
			res.json(new Response(200, 'OK', result));
		}
	});
};

//get user with ID
exports.user = function(req, res) {
	User.findById(req.params.id, function(err, result) {
		if(!err) {
			res.json(new Response(200, 'OK', result));
		}
	});
};

//remove a user with ID
exports.remove = function(io) {
	return function(req, res) {
		User.findByIdAndRemove(req.params.id, function(err, result) {
			if(!err) {
				res.json(new Response(200, 'User removed', null));
			}
		});
	};
};

//update a user with ID
exports.update = function(io) {
	return function(req, res) {
		User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
			if(!err) {
				res.json(new Response(200, 'User Updated', result));
			}
		});
	};
};

exports.get = function(req, res) {
	User.find({ role: '55699713204166bc31043e4b' }).select('_id firstName lastName privateNumber').exec(function(err, result) {
		if(!err) {
			res.json(new Response(200, 'OK', result));
		}
	});
};

//authenticate users
exports.authenticate = function(io) {	
	return function(req, res) {
		var query = User.findOne({ username: req.body.username }).select('-avatar');
		
		query.exec(function(err, user) {
			if(err) {
				return res.json(new Response(401, 'ავტორიზაციის შეცდომა', null));
			}
			
			if(user) {
				user.comparePassword(req.body.password, function(err, isMatch) {
					if(err) {
						return res.json(new Response(401, 'ავტორიზაციის შეცდომა', null));
					}
					
					if(isMatch) {
						var expires = moment().add(1, 'day').valueOf();
						var token = jwt.encode({
							iss: user.id,
							exp: expires
						}, config.get('tokenSecret'));
						
						io.sockets.emit(socketEvents.USER_LOGGED_IN, user.id);
						
						res.json(new Response(200, 'Authentication Success', {
							token: token,
							expires: expires,
							user: user.toJSON()
						}));
					} else {
						return res.json(new Response(401, 'არასწორი მომხმარებელი/პაროლი', null));
					}
				});
			} else {
				return res.json(new Response(401, 'არასწორი მომხმარებელი/პარლი (UNF)', null));
			}
		});
	};
};