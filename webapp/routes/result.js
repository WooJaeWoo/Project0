var express = require('express');
var router = express.Router();
var Answer = require(config.root.MODEL_ROOT + '/answer');

function saveAnswer(ua, answers) {
	var answer = new Answer();
	answer.ua = ua;
	answer.gender = answers.a1;
	answer.age = answers.a2;
	answer.married = answers.a3;
	answer.atHome = answers.a4;
	answer.needs = answers.a5;
	answer.interiorRatio = answers.a6;
	answer.color = answers.a7;
	answer.culture = answers.a8;
	answer.save(function(err) {
		logger.info("Answer is saved!");
		if (err) {
			logger.error("DB error: saving Answer!");
		}
	});
}

router.post("/", function(req, res, next) {
	
	// DB: save answer
	saveAnswer(req.headers['user-agent'], req.body);
	
	// Calculating score
	
	
	res.send(req.body);
});

module.exports = router;
