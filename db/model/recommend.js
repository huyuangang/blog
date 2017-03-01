var RecoSchema = require('../schema/recommend.js');
var mongoose = require('mongoose');
var Recommend = mongoose.model('recommend',RecoSchema);

module.exports = Recommend;