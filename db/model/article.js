var ArticleSchema = require('../schema/article.js')
var mongoose = require('mongoose')

var Article  = mongoose.model('article',ArticleSchema);

module.exports = Article;