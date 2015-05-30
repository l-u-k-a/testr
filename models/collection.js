var mongoose = require('../utils/db');
var Schema = mongoose.Schema;

var schema = new Schema({
	value: {
		type: String,
		required: true
	}
});

exports.Role = mongoose.model('Role', schema);
exports.Status = mongoose.model('Status', schema);
exports.AnswerType = mongoose.model('AnswerType', schema);