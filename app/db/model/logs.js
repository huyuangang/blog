
var LogSchema = require('../schema/logs.js');
var mongoose = require('mongoose');
var Log = mongoose.model('logs',LogSchema);

module.exports = Log;