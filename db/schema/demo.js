// 小样例

var mongoose = require('mongoose')
var demoSchema = new mongoose.Schema({
	name: String,
	description: String,
	createTime: Date,
	status:Boolean         //是否显示
	pv:{
		type: Number,
		default: 0
	},
	review:{
		type: Number,
		default: 0
	}
})

module.exports = demoSchema