module.exports = function(app) {
	
	app.use("/", require("./index"));
	
	app.use("/score", require("./score"));
	
	app.use("/result", require("./result"));
	
	app.use("/data", require("./data"));
};
