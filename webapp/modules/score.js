var magazine = ["design", "happy", "luxury", "mywedding", "mens", "enfant"];

var scoreMatrix = {
	a1: { //gender
		"M": [1, 2, 3, 4, 5, 6],
		"F": [1, 2, 3, 4, 5, 6]
	},
	a2: { // age
		"10": [1, 2, 3, 4, 5, 6],
		"20": [1, 2, 3, 4, 5, 6],
		"30": [1, 2, 3, 4, 5, 6],
		"40": [1, 2, 3, 4, 5, 6],
		"50": [1, 2, 3, 4, 5, 6],
		"60": [1, 2, 3, 4, 5, 6]
	},
	a3: { // married
		"true": [1, 2, 3, 4, 5, 6],
		"false": [1, 2, 3, 4, 5, 6]
	},
	a4: { // atHome
		"A": [1, 2, 3, 4, 5, 6],
		"B": [1, 2, 3, 4, 5, 6],
		"C": [1, 2, 3, 4, 5, 6]
	},
	a5: { // needs
		"money": [1, 2, 3, 4, 5, 6],
		"bag": [1, 2, 3, 4, 5, 6],
		"book": [1, 2, 3, 4, 5, 6],
		"friend": [1, 2, 3, 4, 5, 6],
		"love": [1, 2, 3, 4, 5, 6]
	},
	a6: { // interiorRatio
		"A": [1, 2, 3, 4, 5, 6],
		"B": [1, 2, 3, 4, 5, 6],
		"C": [1, 2, 3, 4, 5, 6]
	},
	a7: { // color
		"red": [1, 2, 3, 4, 5, 6],
		"yellow": [1, 2, 3, 4, 5, 6],
		"green": [1, 2, 3, 4, 5, 6],
		"blue": [1, 2, 3, 4, 5, 6],
		"purple": [1, 2, 3, 4, 5, 6]
	},
	a8: { // culture
		"DIY": [1, 2, 3, 4, 5, 6],
		"cook": [1, 2, 3, 4, 5, 6],
		"travel": [1, 2, 3, 4, 5, 6],
		"exercise": [1, 2, 3, 4, 5, 6],
		"exhibition": [1, 2, 3, 4, 5, 6]
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
	this.addScores(scoreMatrix.a8[answer.a8[2]]);
}
scoreMod.prototype.getResult = function() {
	var maxIdx = -1;
	var nextMaxIdx = -1;
	
	var maxVal = 0;
	var nextMaxVal = 0;
	
	for (var i = 0; i < this.score.length; i++) {
		if (this.score[i] > maxVal) {
			nextMaxIdx = maxIdx;
			maxIdx = i;
		} else if (this.score[i] > nextMaxVal) {
			nextMaxIdx = i;
		}
	}
	return { first: magazine[maxIdx], second: magazine[nextMaxIdx] };
}

module.exports = scoreMod;