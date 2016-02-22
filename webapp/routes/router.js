module.exports = function(app) {
	
	app.use("/", require("./index"));
	
	app.use("/result", require("./result"));
};
