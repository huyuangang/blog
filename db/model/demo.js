
var demoSchema = require('../schema/demo.js')
var mongoose = require('mongoose')

var demo = mongoose.model('demo',demoSchema)


module.exports = demo