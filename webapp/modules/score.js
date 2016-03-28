var config = require('../../config/index.js');

var magazine = config.service.magazine;

var scoreMatrix = config.service.scoreMatrix;

var scoreMod = function() {
	this.score = [0, 0, 0, 0, 0, 0];
}
scoreMod.prototype.addScores = function(scoreArray) {
	scoreArray.forEach(function(element, index) {
		this.score[index] += element;
	}.bind(this));
}
scoreMod.prototype.calculate = function(answer) {
	
	if (!(answer.a1 && answer.a2 && answer.a3 && answer.a4
	   && answer.a5[0] && answer.a5[1] && answer.a6
	   && answer.a7 && answer.a8[0] && answer.a8[1])) {
		return;
	}
	
	this.addScores(scoreMatrix.a1[answer.a1]);
	this.addScores(scoreMatrix.a2[answer.a2]);
	this.addScores(scoreMatrix.a3[answer.a3]);
	this.addScores(scoreMatrix.a4[answer.a4]);
	this.addScores(scoreMatrix.a5[answer.a5[0]]);
	this.addScores(scoreMatrix.a5[answer.a5[1]]);
	this.addScores(scoreMatrix.a6[answer.a6]);
	this.addScores(scoreMatrix.a7[answer.a7]);
	this.addScores(scoreMatrix.a8[answer.a8[0]]);
	this.addScores(scoreMatrix.a8[answer.a8[1]]);
}
scoreMod.prototype.getScore = function() {
	var sum = 0;
	this.score.forEach(function(element, index) {
		sum += element;
	});
	if (sum === 0) {
		return false;
	}
	return this.score;
}
scoreMod.prototype.getResult = function() {
	var maxIdx = -1;
	var nextMaxIdx = -1;
	
	var maxVal = 0;
	var nextMaxVal = 0;
	
	for (var i = 0; i < this.score.length; i++) {
		if (this.score[i] > maxVal) {
			nextMaxIdx = maxIdx;
			nextMaxVal = maxVal;
			maxIdx = i;
			maxVal = this.score[i];
		} else if (this.score[i] > nextMaxVal) {
			nextMaxIdx = i;
			nextMaxVal = this.score[i];
		}
	}
	return { first: magazine[maxIdx], second: magazine[nextMaxIdx] };
}

module.exports = scoreMod;