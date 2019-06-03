const path = require('path');

module.exports = {

	mode: "development",
	entry: "./src/public/js/",
	output: { 
		path: path.resolve(__dirname, "./src/public/js"),
		filename: "bundle.js"
	},

	devServer: {
		compress: true,
		port: 9000
	}
};