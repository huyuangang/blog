var RecoSchema = require('../schema/recommend.js');
var mongoose = require('mongoose');
var Recommend = mongoose.model('info',RecoSchema);

module.exports = Recommend;