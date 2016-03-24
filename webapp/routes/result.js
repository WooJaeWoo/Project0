var express = require('express');
var router = express.Router();

router.get("/:mag", function(req, res, next) {
	var mag = req.params.mag;
	if (mag.indexOf())
	res.render("result", {
		mag: mag
	});
});

module.exports = router;
