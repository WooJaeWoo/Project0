var express = require('express');
var router = express.Router();
var Answer = require(config.root.MODEL_ROOT).answer;

router.get("/", function(req, res, next) {
	
	var data = new Answer();
	Answer.find().exec(function(err, data) {
		if (err) {
			logger.error(err);
			throw err;
		}
		
		res.render("data", {
			data: data
		});
	});
	
});

module.exports = router;
