var express = require('express');
var router = express.Router();

router.get("/:mag", function(req, res, next) {
	var mag = req.params.mag;
	if (config.service.magazine.indexOf(mag) >= 0) {
		res.render("result", { mag: mag });
	} else {
		next();
	}
});

module.exports = router;
