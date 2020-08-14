let mongoose  = require('mongoose')
let storeSchema = require('./storeSchema')

module.exports = mongoose.model('Stores', storeSchema, 'stores');