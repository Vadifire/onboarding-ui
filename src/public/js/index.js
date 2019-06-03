
const OK_RESPONSE_CODE = 200;

document.addEventListener('DOMContentLoaded', getHomeTimeline);

function getHomeTimeline() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == XMLHttpRequest.DONE) {
			var tweetsDiv = document.getElementById("tweets");
			if (this.status == OK_RESPONSE_CODE) {
				tweetsDiv.innerHTML = "";
				var responseObj = JSON.parse(this.responseText);
				for (var i = 0; i < responseObj.length; i++) {
					var tweetDiv = document.createElement("div");
					if (i % 2 == 0) {
						tweetDiv.style = "background-color:#e8f5fd;color:black;padding:20px;";
					} else {
						tweetDiv.style = "background-color:#e9e9e9;color:black;padding:20px;";
					}

					var imageElement = document.createElement("img");
					imageElement.setAttribute("src", responseObj[i].user.profileImageUrl);
					tweetDiv.appendChild(imageElement);

					tweetDiv.appendChild(
						document.createTextNode("[" + new Date(responseObj[i].createdAt).toUTCString() + "] ")
					);

					var messageSpan = document.createElement("span");
					var messageElement = document.createElement("a");
					messageElement.innerHTML = responseObj[i].message;
					messageElement.setAttribute("href", responseObj[i].url);
					messageElement.setAttribute("target", "_blank");
					messageSpan.appendChild(messageElement);
					tweetDiv.appendChild(messageSpan);

					tweetsDiv.appendChild(tweetDiv);
				}
			} else {
				if (this.response) {
					console.error("Server responded with error: " + this.response);
					tweetsDiv.innerHTML = this.response;
				} else {
					console.error("Connection to tweeting server failed.");
					tweetsDiv.innerHTML = "Service is temporarily unavailable.";
				}
			}
		}
	}
	xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
	xhttp.send();
}
