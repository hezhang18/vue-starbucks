let mongoose  = require('mongoose')
let userSchema = require('./userSchema')

module.exports = mongoose.model('Users', userSchema, 'users');
