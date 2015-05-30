var url = require('url');
var User = require('../models/user');
var jwt = require('jwt-simple');
var Response = require('../models/response');
var config = require('../config/index');

module.exports = function(req, res, next) {	
	// Parse the URL
	var parsed_url = url.parse(req.url, true);
	var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];

	if(token) {
		try {
			var decoded = jwt.decode(token, config.get('tokenSecret'));
			
			if(decoded.exp <= Date.now()) {
				res.json(new Response(401, 'Denied! Access token has expired', null));
			}
			
			User.findOne({'_id': decoded.iss }, function(err, user) {
				req.user = user;
				next();
			});
			
		} catch(e) {
			
			if(!e) {
				next();
			} else {
				res.status(401).json(new Response(401, 'Access Denied', null));
			}
		}
	} else {
		res.status(401).json(new Response(401, 'Access denied', null));
	}
};