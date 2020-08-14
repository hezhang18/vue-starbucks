let mongoose  = require('mongoose')
let productSchema = require('./productSchema')

module.exports = mongoose.model('Merchandise', productSchema, 'merchandise');