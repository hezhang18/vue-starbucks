let mongoose  = require('mongoose')
let productSchema = require('./productSchema')

module.exports = mongoose.model('Beverages', productSchema, 'beverages');