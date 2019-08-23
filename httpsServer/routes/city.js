require('./linkedDB');

let express = require('express');
let router = express.Router();
let City = require('../models/city');

router.get("/items", (req, res, next)=>{
	City.find({}, (err, doc)=>{
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