var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var answer = new Schema({
		ua: { type: String },
		gender: { type: String },
		age: { type: Number, min: 10, max: 60 },
		married: { type: String },
		atHome: { type: String },
		needs: { type: [String] },
		interiorRatio: { type: String },
		color: { type: String },
		culture: { type: [String] }
	}, {
		collection: "answer",
		versionKey: false
});

module.exports = mongoose.model("Answer", answer);