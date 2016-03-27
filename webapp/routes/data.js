var express = require('express');
var router = express.Router();
var Answer = require(config.root.MODEL_ROOT).answer;

router.get("/", function(req, res, next) {
	res.render("data");
});


router.post("/:field", function(req, res, next) {
	var field = "$" + req.params.field;
	
	Answer.aggregate([
		{ $group: { _id: field, count: { $sum: 1 } } }
	], function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		
		res.send(result);
	});
});

module.exports = router;
