
//日志
var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
	content:String,
	createTime:{
		type:Date,
		default:Date.now
	}
})

module.exports = LogSchema;