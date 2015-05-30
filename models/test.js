var mongoose = require('../utils/db');
var Schema = mongoose.Schema;

var schema = new Schema({
	meta: {
		createDate: {
			type: Date,
			default: Date.now,
			required: true
		}
	},
	title: {
		type: String,
		required: true
	},
	points: {
		type: Number,
		default: 20,
		required: true
	},
	duration: {
		type: Number,
		default: 30,
		required: true
	},
	questions: [{
		type: Schema.Types.ObjectId,
		ref: 'Question'
	}],
	audience: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	active: {
		type: Boolean,
		default: true,
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Test', schema);