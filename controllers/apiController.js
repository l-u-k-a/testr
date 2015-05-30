var Response = require('../models/response');

exports.help = function(req, res) {
	res.json(new Response(200, 'Welcome to TestR API', null));
};