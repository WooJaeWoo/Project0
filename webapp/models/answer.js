var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var answer = new Schema({
		ua: { type: String },
		gender: { type: String },
		age: { type: Number, min: 10, max: 60 },
		married: { type: Boolean },
		atHome: { type: Number },
		needs: { type: [String] },
		interiorRatio: { type: Number, min: 0, max: 100 },
		color: { type: String },
		culture: { type: [String] }
	}, {
		collection: "answer",
		versionKey: false
});

module.exports = mongoose.model("Answer", answer);