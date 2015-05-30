var mongoose = require('../utils/db');
var Schema = mongoose.Schema;

var schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	test: {
		type: Schema.Types.ObjectId,
		ref: 'Test',
		rqeuired: true
	},
	date: {
		type: Date,
		default: Date.now,
		required: true
	},
	points: {
		type: Number,
		default: 0,
		required: true
	}
});

module.exports = mongoose.model('Result', schema);