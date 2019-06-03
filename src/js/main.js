const express = require("express");
const app = express();

const port = 9000;

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: "src/" }, (err) => {
		if (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	})
});

app.get("/src/js/index.js", (req,res) => {
	res.sendFile("index.js", { root: "src/js/" }, (err) => {
		if (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	})
});

app.listen(port, () => console.log("NodeJS has been started on port " + port));