var Response = require('../models/response');
var Collections = require('../models/collection');

exports.roles = {
	post: function(req, res) {
		new Collections.Role(req.body).save(function(err, result) {
			if(!err) {
				res.json(new Response(200, 'OK', result));
			}
		});
	},
	get: function(req, res) {
		Collections.Role.find(function(err, result) {
			if(!err) {
				res.json(new Response(200, 'OK', result));
			}
		});
	}
};