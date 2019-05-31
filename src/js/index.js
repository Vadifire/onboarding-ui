function getHomeTimeline() {
	console.log("exec");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				var tweetsDiv = document.getElementById("tweets");
				while (tweetsDiv.firstChild) { // First, clear DIV
					tweetsDiv.removeChild(tweetsDiv.firstChild);
				}
				var responseObj = JSON.parse(this.responseText);
				for (var i = 0; i < responseObj.length; i++) {
					var tweetDiv = document.createElement("div");
					if (i % 2 == 1) {
						tweetDiv.className = "even-row"; // It's reversed because i == 0 is "1st" tweet 
					} else {
						tweetDiv.className = "odd-row";
					}

					var tweetLink = document.createElement("a");
					tweetLink.href = responseObj[i].url;
					tweetLink.setAttribute("target", "_blank");

					var tweetSpan = document.createElement("span");
					tweetSpan.className = "tweet";
					tweetSpan.href = responseObj[i].url;

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

					tweetSpan.appendChild(userDiv);
					tweetSpan.appendChild(contentDiv);
					tweetDiv.appendChild(tweetSpan);
					tweetLink.appendChild(tweetDiv);
					tweetsDiv.appendChild(tweetLink);
				}
			} else {
				console.error(this.response);
			}
		}
	}
	xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
	xhttp.send();
}

window.getHomeTimeline = getHomeTimeline;