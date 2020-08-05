let mongoose  = require('mongoose')
let Schema = mongoose.Schema;

let pageviewSchema = new Schema({
    "UserType":String,
    "PageViews":Number,
	"VisitorInfo":[
		{
			"Location":String,
			"Time":String,
			"Device":String,
			"Browser":String,
			"IP":String
		}
	]
});

module.exports = pageviewSchema;