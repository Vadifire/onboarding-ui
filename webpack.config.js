const path = require('path');

module.exports = {

	mode: "development",
	entry: "./src/js/",
	output: { 
		path: path.resolve(__dirname, "./src/public"),
		filename: "bundle.js"
	},

	devServer: {
		compress: true,
		port: 9000
	}
};