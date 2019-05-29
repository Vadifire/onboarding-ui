const http = require("http");
const fs = require("fs");
const express = require('express')
const app = express()

const port = 9000;

app.get('/', (requqest, response) => {
	response.sendFile('index.html', { root: 'src/' })
});

app.listen(port, () => console.log("NodeJS has been started on port " + port))