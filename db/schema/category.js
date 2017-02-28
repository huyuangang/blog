//文章类别
var mongoose = require('mongoose')

var cateSchema = new mongoose.Schema({
	name: String,
	articles: [],
	createTime: {
		type:Date,
		default:Date.now
	}
})

module.exports = cateSchema
