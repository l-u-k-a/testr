var mongoose = require('../utils/db');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var schema = new Schema({
	meta: {
		createDate: {
			type: Date,
			default: Date.now,
			required: true
		}
	},
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	email: {
		type: String
	},
	privateNumber: {
		type: String,
		required: true
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: 'Role',
		required: true
	}
});

schema.pre('save', function(next) {
	var user = this;
	
	//if modified
	if(!user.isModified('password')) return next();
	
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);
		
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
		
			user.password = hash;
			next();
		});
	});
});

schema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return callback(err);
		
		callback(null, isMatch);
	});
};

schema.statics.findByUsername = function(username, callback) {
	this.findOne({ username: username }, callback);
};

module.exports = mongoose.model('User', schema);