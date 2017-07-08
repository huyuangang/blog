// 文章
var mongoose = require('mongoose');
var Cate = require('../model/category.js');

var articleSchema = new mongoose.Schema({
	title: String,         //标题
	description: String,   //描述
	cates: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "cates"
		}
	],          //类别
	text: '',
	html: '',
	createTime: {          //创建时间
		type: Date,
		default: Date.now
	},
	status: {               //是否显示
		type: Boolean,
		default: true
	},
	pv: {                  //浏览量
		type: Number,
		default: 0
	},
	review: {               //评论量
		type: Number,
		default: 0
	}
})

articleSchema.static('findAll', function (status = false) {
	if (status) {
		return this
			.find({ status: true })
			.populate('cates', 'name')
			.sort({ 'createTime': -1 });
	}
	else {
		return this
			.find({})
			.populate('cates', ['name'])
			.sort({ 'createTime': -1 });
	}
})
module.exports = articleSchema

