require('./linkedDB');

let express = require('express');
let router = express.Router();
let Coffee = require('../models/coffee');

router.get("/items", (req, res, next)=>{
	Coffee.find({}, (err, doc)=>{
		if(err){
			res.json({
				status: 1,
				msg: err.message
			});
			return;
		}
		
		if(doc){
			res.json({
				status: 0,
				msg: '',
				result: {
					count: doc.length,
					data: doc
				}
			});
		}else{
			res.json({
				status: 1,
				msg: 'data file does not exist!'
			});
		}
	});
});

module.exports = router;