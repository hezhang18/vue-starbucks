let mongoose  = require('mongoose')
let Schema = mongoose.Schema;

let storeSchema = new Schema({
	"Brand": String,
	"Country": String,
	"City": String,
	"CenterLon": String,
	"CenterLat": String,
	"StoreNum": String,
	"Store Number": String,
	"Store Name": String,
	"Street Address": String,
	"Longitude": String,
	"Latitude": String,
	"Phone Number": String,
	"Postcode": String,
	"Ownership Type": String
});

module.exports = storeSchema;