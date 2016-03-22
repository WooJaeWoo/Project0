var express = require('express');
var router = express.Router();

router.get("/:mag", function(req, res, next) {
	var mag = req.params.mag;
	var smag = req.query.s;
	res.render("result", {
		mag: mag,
		smag: smag
	});
});

module.exports = router;
