const http = require("http");
const fs = require("fs");
const express = require('express')
const app = express()

const port = 9000;

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: 'src/' }, (err) => {
		if (err) {
			console.log(err);
		}
	})
});

app.listen(port, () => console.log("NodeJS has been started on port " + port))