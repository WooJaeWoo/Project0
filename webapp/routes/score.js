var express = require('express');
var router = express.Router();
var Answer = require(config.root.MODEL_ROOT).answer;
var scoreMod = require(config.root.MODULE_ROOT).score;

function saveAnswer(ua, answers, result) {
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
	answer.type = result;
	answer.save(function(err) {
		if (err) {
			logger.error("DB error: saving Answer!");
		} else {
			logger.info("Answer is saved!");
		}
	});
}
router.post("/", function(req, res, next) {
	// Calculating score
	var score = new scoreMod();
	// calculate
	score.calculate(req.body);
	var myscore = score.getScore();
	var result = score.getResult();
	
	if (!myscore) {
		res.status(400).send("Wrong answer type");
	} else {
		// DB: save answer
		saveAnswer(req.headers['user-agent'], req.body, result.first);
		
		res.send({
			url: "/result/" + result.first
		});
	}	
});

module.exports = router;
