var mongoose = require('../utils/db');
var Schema = mongoose.Schema;

var schema = new Schema({
	text: {
		type: String,
		required: true
	}
});

exports.Role = mongoose.model('Role', schema);