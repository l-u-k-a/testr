module.exports = function(status, message, data) {
	this.status = status;
	this.timestamp = new Date();
	this.message = message;
	this.data = data;
};