let mongoose  = require('mongoose')
let productSchema = require('./productSchema')

module.exports = mongoose.model('Food', productSchema, 'food');