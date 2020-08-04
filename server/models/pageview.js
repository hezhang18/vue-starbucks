let mongoose  = require('mongoose')
let pageviewSchema = require('./pageviewSchema')

module.exports = mongoose.model('PageView', pageviewSchema, 'pageview');
