let mongoose = require('mongoose');
let state = '';

let linkedDB = (()=>{
	// 连接本地数据库
	mongoose.connect('mongodb://UserName:PassWord@127.0.0.1:27017/vSbux', {useNewUrlParser: true});

	mongoose.connection.on("connected", ()=>{
		console.log("MongoDB Connected Success!");
	});

	mongoose.connection.on("error", ()=>{
		console.log("MongoDB Connected Failed!");
	});

	mongoose.connection.on("disconnected", ()=>{
		console.log("MongoDB Disconnected!");
	});
})();

module.exports = linkedDB;
