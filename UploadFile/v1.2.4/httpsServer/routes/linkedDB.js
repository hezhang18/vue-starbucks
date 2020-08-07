let mongoose = require('mongoose');
let state = '';

let linkedDB = (()=>{
	// 连接本地数据库
	// mongoose.connect('mongodb://Jeff:Jeff1994%40Shanghai@127.0.0.1:27017/vStarbucks', {useNewUrlParser: true});
	//连接百度云数据库
	mongoose.connect('mongodb://Jeff:Jeff1994%40Shanghai@47.114.181.210:27017/vStarbucks', {useNewUrlParser: true});

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
