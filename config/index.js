var path = require('path');

module.exports = {
	root: require('./root.js'),
	app: {
		port: 3000,
		evn: "production"
	},
	database: {
		localhost: "mongodb://localhost:27017/project0",
		options: {}
	},
	service: require('./service.js'),
	error: require('./error.js')
};
