var InfoSchema = require('../schema/info.js');
var mongoose = require('mongoose');
var Info = mongoose.model('info',InfoSchema);

module.exports = Info;


