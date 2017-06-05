var cateSchema = require('../schema/category.js')
var mongoose = require('mongoose')
var Category = mongoose.model('cate',cateSchema)
module.exports = Category