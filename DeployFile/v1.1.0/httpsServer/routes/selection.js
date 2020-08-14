require('./linkedDB');

let express = require('express');
let router = express.Router();
let Selection = require('../models/selection');

router.get("/items", (req, res, next)=>{

	let page = parseInt(req.param("page")),
	    pageSize = parseInt(req.param("pageSize")),
	    skip = (page - 1) * pageSize,
        params = {},
        SelectionModel = Selection.find(params).skip(skip).limit(pageSize);

    SelectionModel.exec((err, doc)=>{

		if(err){
			res.json({
				status: 1,
				msg: err.message
			});
			return ;
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