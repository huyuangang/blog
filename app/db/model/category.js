var cateSchema = require('../schema/category.js')
var mongoose = require('mongoose')
var Category = mongoose.model('cates',cateSchema)
module.exports = Category