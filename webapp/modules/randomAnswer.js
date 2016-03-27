var mongoose = require('mongoose');
var path = require('path');
var Answer = require('../models/index.js').answer;

mongoose.connect("mongodb://localhost:27017/project0");

function randAnswer(answerArr) {
	var ranNum = Math.floor(Math.random() * answerArr.length);
	return answerArr[ranNum];
}

function randTwoAnswer(answerArr) {
	var answer = [];
	answer.push(randAnswer(answerArr));
	
	while(true) {
		var second = randAnswer(answerArr);
		if (second != answer[0]) {
			answer.push(second);
			break;
		}
	}
	
	return answer;
}

function makeFakeAnswer() {
	var answer = {};
	answer.a1 = randAnswer(["M", "F"]);
	answer.a2 = randAnswer([10, 20, 30, 40, 50 , 60]);
	answer.a3 = randAnswer(["yes", "no"]);
	answer.a4 = randAnswer(["A", "B", "C"]);
	answer.a5 = randTwoAnswer(["bag", "bike", "chair", "watch", "laptop", "stroller"]);
	answer.a6 = randAnswer(["A", "B", "C"]);
	answer.a7 = randAnswer(["red", "yellow", "cyan", "purple", "green"]);
	answer.a8 = randTwoAnswer(["travel", "exercise", "DIY", "cook", "exhibition"]);
	
	return answer;
}
var limitCnt = 10;
var cnt = 0;
function saveAnswer(answers) {
	var answer = new Answer();
	answer.ua = "Fake user";
	answer.gender = answers.a1;
	answer.age = answers.a2;
	answer.married = answers.a3;
	answer.atHome = answers.a4;
	answer.needs = answers.a5;
	answer.interiorRatio = answers.a6;
	answer.color = answers.a7;
	answer.culture = answers.a8;
	answer.save(function(err) {
		if (err) {
			console.error("DB error: saving Answer!");
		} else {
			cnt++;
			if (cnt < limitCnt) {
				saveAnswer(makeFakeAnswer());
			}
			console.log("[log] Fake answer is saved (" + cnt + ")" );
		}
	});
}

saveAnswer(makeFakeAnswer());