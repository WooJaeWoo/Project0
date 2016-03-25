var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
	res.render(config.root.VIEW_ROOT);
});

router.get("/test", function(req, res, next) {
	res.render("test");
});

module.exports = router;
