import "../css/index.scss";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import HelloMessage from "./HelloMessage";

const OK_RESPONSE_CODE = 200;

document.addEventListener("DOMContentLoaded", () => {

	ReactDOM.render(
	  <HelloMessage></HelloMessage>,
	  document.getElementById("hello-react")
	);

	document.getElementById("update-timeline").onclick = getHomeTimeline;
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
					errorDiv.classList.add("hidden");
					tweetsDiv.classList.remove("hidden");
					for (var i = 0; i < responseObj.length; i++) {
						var rowDiv = document.createElement("div");
						rowDiv.className = "row";
						var tweetDiv = document.createElement("div");
						tweetDiv.className = "tweet";

						var userDiv = document.createElement("div");
						userDiv.className = "user-div";
						var contentDiv = document.createElement("div");
						contentDiv.className = "content-div";
						if (!responseObj[i].user) {
							responseObj[i].user = {
								name: "Unknown User",
								twitterHandle: ""
							};
						} else { // Only show image if user is known
							var imageElement = document.createElement("img");
							imageElement.className = "profile-image";
							imageElement.setAttribute("src", responseObj[i].user.profileImageUrl);
							userDiv.appendChild(imageElement);
						}

						var nameDiv = document.createElement("div");
						nameDiv.appendChild(document.createTextNode(responseObj[i].user.name));
						nameDiv.className = "display-name";
						userDiv.appendChild(nameDiv);
						var twitterHandleDiv = document.createElement("div");
						twitterHandleDiv.appendChild(document.createTextNode(responseObj[i].user.twitterHandle));
						twitterHandleDiv.className = "twitter-handle";
						userDiv.appendChild(twitterHandleDiv);

						var dateDiv = document.createElement("div");
						dateDiv.className = "date";
						dateDiv.appendChild(document.createTextNode(
							new Date(responseObj[i].createdAt).toLocaleString("en-us", 
									{month: "short", day: "numeric"})
						));
						contentDiv.appendChild(dateDiv);
						
						var messageDiv = document.createElement("div");
						messageDiv.className = "message";
						var tweetLink = document.createElement("a");
						tweetLink.innerHTML = responseObj[i].message;
						tweetLink.href = responseObj[i].url;
						tweetLink.className = "tweet-link";
						tweetLink.setAttribute("target", "_blank");
						messageDiv.appendChild(tweetLink);
						contentDiv.appendChild(messageDiv);

						tweetDiv.appendChild(userDiv);
						tweetDiv.appendChild(contentDiv);
						rowDiv.appendChild(tweetDiv);
						tweetsDiv.appendChild(rowDiv);
					}
				} else {
					showError(tweetsDiv, errorDiv, "Home timeline is empty.");
				}
			} else {
				showError(tweetsDiv, errorDiv, "Failed to fetch home timeline. Please try again later.");
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

function showError(tweetsDiv, errorDiv, errorMsg) {
	tweetsDiv.classList.add("hidden");
	errorDiv.classList.remove("hidden");
	errorDiv.innerHTML = errorMsg;
}