var mongoose = require('mongoose');

var InfoSchema = new mongoose.Schema({
	img:String,
	name:String,
	description:String,
	address:String,
	email:String
})
module.exports = InfoSchema;