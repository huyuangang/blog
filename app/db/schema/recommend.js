//推荐
var mongoose = require('mongoose');

var RecoSchema = new mongoose.Schema({
	name:String,
	url:String,
	createTime:{
		type:Date,
		default:Date.now
	}
})
module.exports = RecoSchema;