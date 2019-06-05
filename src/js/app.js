const express = require("express");
const app = express();

const port = 9000;

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: "src/public" }, (err) => {
		if (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
	})
});

app.use(express.static("src/public/")); // Serve all files in public directory

app.listen(port, () => console.log("NodeJS has been started on port " + port));