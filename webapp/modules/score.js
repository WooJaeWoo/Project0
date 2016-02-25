var magazine = ["design", "happy", "luxury", "mywedding", "mens", "enfant"];

var scoreMatrix = {
	a1: { //gender
		"M": [2, 1, 2, 0, 3, 0],
		"F": [1, 2, 2, 3, 0, 2]
	},
	a2: { // age
		"10": [3, 0, 1, 0, 0, 0],
		"20": [2, 1, 2, 2, 2, 1],
		"30": [2, 1, 2, 2, 1, 2],
		"40": [1, 2, 2, 0, 1, 0],
		"50": [1, 3, 1, 1, 0, 0],
		"60": [0, 2, 1, 1, 0, 1]
	},
	a3: { // married
		"true": [1, 1, 1, 0, 0, 3],
		"false": [1, 0, 1, 2, 2, 0]
	},
	a4: { // atHome : 높은 수준부터 A, B, C
		"A": [1, 3, 1, 1, 1, 2], // 집:밖 = 16:8
		"B": [2, 2, 2, 1, 1, 1], // 집:밖 = 12:12
		"C": [3, 1, 1, 1, 1, 0]  // 집:밖 = 8:16
	},
	a5: { // needs : 여기는 선택지를 임의로 넣은거라서 수정하고 추가를 마구 하셔도 좋습니다.
		"DE": [3, 2, 1, 1, 1, 1],
		"HA": [2, 3, 1, 1, 1, 1],
		"LU": [1, 1, 3, 2, 1, 1],
		"MY": [1, 1, 2, 3, 1, 1],
		"MA": [1, 1, 1, 1, 3, 1],
		"MO": [1, 2, 1, 1, 1, 3]
	},
	a6: { // interiorRatio : 높은 수준부터 A, B, C
		"A": [3, 3, 1, 2, 1, 2],
		"B": [2, 2, 1, 1, 1, 1],
		"C": [0, 0, 1, 0, 1, 0]
	},
	a7: { // color
		"red": [2, 1, 1, 0, 3, 0],
		"yellow": [1, 2, 3, 2, 1, 1],
		"green": [3, 1, 2, 1, 0, 1],
		"blue": [2, 1, 2, 1, 2, 3],
		"purple": [3, 1, 2, 1, 1, 1]
	},
	a8: { // culture
		"DIY": [3, 3, 1, 1, 1, 2],
		"travel": [2, 2, 2, 2, 1, 0],
		"exercise": [1, 1, 1, 0, 3, 0],
		"exhibition": [3, 2, 1, 1, 0, 1],
		"cook": [2, 3, 1, 0, 0, 2]
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