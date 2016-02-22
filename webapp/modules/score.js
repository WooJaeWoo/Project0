var magazine = ["design", "happy", "luxury", "mywedding", "mens", "enfant"];

var scoreMatrix = {
	a1: { //gender
		"M": [1, 2, 3, 4, 5, 6],
		"F": [4, 3, 6, 5, 2, 1]
	},
	a2: { // age
		"10": [4, 3, 6, 5, 2, 1],
		"20": [1, 2, 3, 4, 5, 6],
		"30": [6, 4, 2, 3, 1, 5],
		"40": [6, 4, 2, 3, 1, 5],
		"50": [4, 3, 6, 5, 2, 1],
		"60": [1, 2, 3, 4, 5, 6]
	},
	a3: { // married
		"true": [4, 3, 6, 5, 2, 1],
		"false": [1, 2, 3, 4, 5, 6]
	},
	a4: { // atHome
		"A": [1, 2, 3, 4, 5, 6],
		"B": [4, 3, 6, 5, 2, 1],
		"C": [6, 4, 2, 3, 1, 5]
	},
	a5: { // needs
		"money": [1, 2, 3, 4, 5, 6],
		"bag": [4, 3, 6, 5, 2, 1],
		"book": [1, 2, 3, 4, 5, 6],
		"friend": [1, 2, 3, 4, 5, 6],
		"love": [4, 3, 6, 5, 2, 1]
	},
	a6: { // interiorRatio
		"A": [4, 3, 6, 5, 2, 1],
		"B": [6, 4, 2, 3, 1, 5],
		"C": [1, 2, 3, 4, 5, 6]
	},
	a7: { // color
		"red": [1, 2, 3, 4, 5, 6],
		"yellow": [6, 4, 2, 3, 1, 5],
		"green": [1, 2, 3, 4, 5, 6],
		"blue": [4, 3, 6, 5, 2, 1],
		"purple": [6, 4, 2, 3, 1, 5]
	},
	a8: { // culture
		"DIY": [1, 2, 3, 4, 5, 6],
		"cook": [4, 3, 6, 5, 2, 1],
		"travel": [6, 4, 2, 3, 1, 5],
		"exercise": [4, 3, 6, 5, 2, 1],
		"exhibition": [6, 4, 2, 3, 1, 5]
	}
};

var scoreMod = function() {
	this.score = [0, 0, 0, 0, 0, 0];
}
scoreMod.prototype.addScores = function(scoreArray) {
	scoreArray.forEach(function(element, index) {
		this.score[index] += element;
	}.bind(this));
}
scoreMod.prototype.calculate = function(answer) {
	
	// TODO: verify answer first!!!
	
	this.addScores(scoreMatrix.a1[answer.a1]);
	this.addScores(scoreMatrix.a2[answer.a2]);
	this.addScores(scoreMatrix.a3[answer.a3]);
	var atHome = "C";
	if (answer.a4 > 10 && answer.a4 <= 16) {
		atHome = "B";
	} else if (answer.a4 > 16) {
		atHome = "A";
	}
	this.addScores(scoreMatrix.a4[atHome]);
	this.addScores(scoreMatrix.a5[answer.a5[0]]);
	this.addScores(scoreMatrix.a5[answer.a5[1]]);
	var interiorRatio = "C";
	if (answer.a6 > 10 && answer.a6 <= 30) {
		interiorRatio = "B";
	} else if (answer.a6 > 30) {
		interiorRatio = "A";
	}
	this.addScores(scoreMatrix.a6[interiorRatio]);
	this.addScores(scoreMatrix.a7[answer.a7]);
	this.addScores(scoreMatrix.a8[answer.a8[0]]);
	this.addScores(scoreMatrix.a8[answer.a8[1]]);
}
scoreMod.prototype.getScore = function() {
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