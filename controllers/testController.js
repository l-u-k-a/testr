var Response = require('../models/response');
var Test = require('../models/test');
var socketEvents = require('../utils/socketEvents');

exports.create = function(io) {
	return function(req, res) {
		var test = new Test(req.body);
		
		test.save(function(err, result) {
			if(!err) {
				res.json(new Response(200, 'OK', result));
			} else {
				res.json(err);
			}
		});
	};
};

exports.get = function(req, res) {
	var query = Test.find().select('title duration points questions active');
	
	query.exec(function(err, result) {
		if(!err) {
			res.json(new Response(200, 'OK', result));
		}
	});
};

exports.my = function(req, res) {
	Test.find({ active: true, audience: { $contains: req.params.id } }).select('title duration points _id').exec(function(err, result) {
		if(!err) {
			res.json(new Response(200, 'OK', result));
		}
	});
};

exports.setState = function(io) {
	return function(req, res) {
		Test.findOneAndUpdate(req.params.id, { active: req.body.active }, function(err, result) {
			if(!err) {
				if(req.body.active == true) {
					io.sockets.emit(socketEvents.TEST_ACTIVATED);
				} else {
					io.sockets.emit(socketEvents.TEST_DEACTIVATED);
				}				
				res.json(new Response(200, 'State Updated!', result));
			}
		});
	};
};

exports.submit = function(io) {
	return function(req, res) {
		console.log(req.body);
		
		res.json(req.body);
	};
};