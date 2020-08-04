let mongoose  = require('mongoose')
let Schema = mongoose.Schema;

let pageviewSchema = new Schema({
    "UserType":String,
    "PageViews":Number,
	"VisitorInfo":[
		{
			"IP":String,
			"Browser":String,
			"Time":String,
			"Location": String
		}
	]
});

module.exports = pageviewSchema;