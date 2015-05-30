var mongoose = require('../utils/db');
var Schema = mongoose.Schema;

var schema = new Schema({
	text: {
		type: String,
		required: true
	},
	image: {
		type: String
	},
	answerType: {
		type: Schema.Types.ObjectId,
		ref: 'AnswerType'
	},
	answers: [{
		type: Schema.Types.ObjectId,
		ref: 'Answer'
	}],
	correctAnswers: [{
		type: Schema.Types.ObjectId,
		ref: 'Answer'
	}]
});

module.exports = mongoose.model('Result', schema);