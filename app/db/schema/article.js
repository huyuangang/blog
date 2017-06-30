// 文章
var mongoose = require('mongoose');
var Log = require('../model/logs.js');
var Cate = require('../model/category.js');

var articleSchema = new mongoose.Schema({
	title: String,         //标题
	description: String,   //描述
	category: [],          //类别
	text:'',
	html:'',
	createTime: {          //创建时间
		type:Date,
		default:Date.now
	},      
	status:{               //是否显示
		type:Boolean,
		default:true
	},        
	pv: {                  //浏览量
		type:Number,
		default: 0
	},
	review:{               //评论量
		type:Number,
		default: 0
	}
})

module.exports = articleSchema