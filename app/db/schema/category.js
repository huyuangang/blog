//文章类别
const mongoose = require('mongoose');
const Article = require('../model/article.js');

let cateSchema = new mongoose.Schema({
	name: String,
	articles: [],
	createTime: {
		type:Date,
		default:Date.now
	}
})



module.exports = cateSchema



