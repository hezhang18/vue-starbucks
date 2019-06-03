let mongoose  = require('mongoose')
let citySchema = require('./citySchema')

module.exports = mongoose.model('City', citySchema, 'city');