
const OK_RESPONSE_CODE = 200;

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("update-timeline").onclick = getHomeTimeline;
	document.getElementById("tweets").style.display = "none";
	getHomeTimeline();
});

function getHomeTimeline() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == XMLHttpRequest.DONE) {
			var tweetsDiv = document.getElementById("tweets");
			var errorDiv = document.getElementById("error-div");
			if (this.status == OK_RESPONSE_CODE) {
				var responseObj = JSON.parse(this.responseText);
				if (responseObj.length > 0) {
					tweetsDiv.innerHTML = "";
					errorDiv.style.display = "none";
					tweetsDiv.style.display = "block";
					var rowDiv;
					for (var i = 0; i < responseObj.length; i++) {
						var rowDiv = document.createElement("div");
						if (i % 2 == 1) {
							rowDiv.className = "even-row"; // It's reversed because i == 0 is "1st" tweet 
						} else {
							rowDiv.className = "odd-row";
						}
						var tweetLink = document.createElement("a");
						tweetLink.href = responseObj[i].url;
						tweetLink.className = "tweet-link";
						tweetLink.setAttribute("target", "_blank");

						var tweetDiv = document.createElement("div");
						tweetDiv.className = "tweet";
						tweetDiv.href = responseObj[i].url;

						var userDiv = document.createElement("div");
						userDiv.className = "user-div";
						var contentDiv = document.createElement("div");
						contentDiv.className = "content-div";

						var imageElement = document.createElement("img");
						imageElement.className = "profile-image";
						imageElement.setAttribute("src", responseObj[i].user.profileImageUrl);
						userDiv.appendChild(imageElement);

						var nameDiv = document.createElement("div");
						nameDiv.appendChild(document.createTextNode(responseObj[i].user.name));
						nameDiv.className = "display-name";
						userDiv.appendChild(nameDiv);
						var twitterHandleDiv = document.createElement("div");
						twitterHandleDiv.appendChild(document.createTextNode(responseObj[i].user.twitterHandle));
						twitterHandleDiv.className = "twitter-handle";
						userDiv.appendChild(twitterHandleDiv);

						dateDiv = document.createElement("div");
						dateDiv.className = "date";
						dateDiv.appendChild(document.createTextNode(
							new Date(responseObj[i].createdAt).toLocaleString("en-us", {month: "short", day: "numeric"})
						));
						contentDiv.appendChild(dateDiv);
						
						var messageDiv = document.createElement("div");
						messageDiv.className = "message";
						messageDiv.appendChild(document.createTextNode(responseObj[i].message));
						contentDiv.appendChild(messageDiv);

						tweetDiv.appendChild(userDiv);
						tweetDiv.appendChild(contentDiv);
						rowDiv.appendChild(tweetDiv);
						tweetLink.appendChild(rowDiv);
						tweetsDiv.appendChild(tweetLink);
					}
					rowDiv.style.borderBottom = "none";
				} else {
					tweetsDiv.style.display = "none";
					errorDiv.style.display = "block";
					errorDiv.innerHTML = "Home timeline is empty.";
				}
			} else {
				tweetsDiv.style.display = "none";
				errorDiv.style.display = "block";
				errorDiv.innerHTML = "Failed to fetch home timeline. Please try again later.";
				if (this.response) { // Log error
					console.error("Server responded with error: " + this.response);
				} else {
					console.error("Connection to tweeting server failed.");
				}
			}
		}
	}
	xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
	xhttp.send();
}