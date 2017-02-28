//推荐
var mongoose = require('mongoose');

var RecoSchema = new mongoose.Schema({
	name:String,
	url:String
})
module.exports = RecoSchema;