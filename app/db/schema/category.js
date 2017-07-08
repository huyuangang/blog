//文章类别
const mongoose = require('mongoose');
const Article = require('../model/article.js');

let cateSchema = new mongoose.Schema({
	name: String,
	articles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'articles'
		}
	],
	createTime: {
		type:Date,
		default:Date.now
	}
})



module.exports = cateSchema



