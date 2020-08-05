let mongoose  = require('mongoose')
let Schema = mongoose.Schema;

let productSchema = new Schema({
	"ProductID": String,
	"ProductName": String,
	"ProductImage": String,
	"Category": String,
	"SubTypes": String
});

module.exports = productSchema;