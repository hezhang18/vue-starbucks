let mongoose  = require('mongoose')
let Schema = mongoose.Schema;

let pageviewSchema = new Schema({
    "UserType":String,
    "VisitorID":String,
    "IP":String,
    "VisitTime":String,
    "Location":String,
	"Screen":String,
    "Device":String,
    "StoresDataLoaded":[
        {
            "DataOrigin":String,
            "LoadTime":String
        }
    ],
    "Login":[
        {
            "LoginTime":String
        }
    ],
    "Logout":[
        {
            "LogoutTime":String
        }
    ],
    "BrowseRecord":[
        {
            "Page":String,
            "BrowseTime":String
        }
    ]
});

module.exports = pageviewSchema;