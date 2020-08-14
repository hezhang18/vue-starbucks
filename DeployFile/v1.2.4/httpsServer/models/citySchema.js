let mongoose  = require('mongoose')
let Schema = mongoose.Schema;

let citySchema = new Schema({
	"City": String,
	"CenterLon": String,
	"CenterLat": String,
	"StoreNum": String
});

module.exports = citySchema;