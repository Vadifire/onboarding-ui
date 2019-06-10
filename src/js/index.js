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

const getHomeTimeline = () => {

	const tweetsDiv = document.getElementById("tweets");
	const errorDiv = document.getElementById("error-div");

	fetch("http://localhost:8080/api/1.0/twitter/timeline").then(response => { // Attempt to fetch tweets
		if (response.ok === true) {
			return response.json();
		} else {
			return Promise.reject(new Error("Failed to fetch tweets. Server responded with status code: " + 
					response.status + ", error message: " + response.statusText));
		}
	}).then(responseJson => { // Got JSON
		if (responseJson.length > 0) {
			tweetsDiv.innerHTML = "";
			errorDiv.classList.add("hidden");
			tweetsDiv.classList.remove("hidden");
			responseJson.forEach(tweet => {
				const rowDiv = document.createElement("div");
				rowDiv.className = "row";
				const tweetDiv = document.createElement("div");
				tweetDiv.className = "tweet";

				const userDiv = document.createElement("div");
				userDiv.className = "user-div";
				const contentDiv = document.createElement("div");
				contentDiv.className = "content-div";
				if (!tweet.user) {
					tweet.user = {
						name: "Unknown User",
						twitterHandle: ""
					};
				} else { // Only show image if user is known
					const imageElement = document.createElement("img");
					imageElement.className = "profile-image";
					imageElement.setAttribute("src", tweet.user.profileImageUrl);
					userDiv.appendChild(imageElement);
				}

				const nameDiv = document.createElement("div");
				nameDiv.appendChild(document.createTextNode(tweet.user.name));
				nameDiv.className = "display-name";
				userDiv.appendChild(nameDiv);
				const twitterHandleDiv = document.createElement("div");
				twitterHandleDiv.appendChild(document.createTextNode(tweet.user.twitterHandle));
				twitterHandleDiv.className = "twitter-handle";
				userDiv.appendChild(twitterHandleDiv);

				const dateDiv = document.createElement("div");
				dateDiv.className = "date";
				dateDiv.appendChild(document.createTextNode(
					new Date(tweet.createdAt).toLocaleString("en-us", {month: "short", day: "numeric"})
				));
				contentDiv.appendChild(dateDiv);
				
				const messageDiv = document.createElement("div");
				messageDiv.className = "message";
				const tweetLink = document.createElement("a");
				tweetLink.innerHTML = tweet.message;
				tweetLink.href = tweet.url;
				tweetLink.className = "tweet-link";
				tweetLink.setAttribute("target", "_blank");
				messageDiv.appendChild(tweetLink);
				contentDiv.appendChild(messageDiv);

				tweetDiv.appendChild(userDiv);
				tweetDiv.appendChild(contentDiv);
				rowDiv.appendChild(tweetDiv);
				tweetsDiv.appendChild(rowDiv);
			});
		} else {
			showError("Home timeline is empty.");
		}

	}).catch(error => { // Failed to fetch tweets
		showError("Failed to fetch home timeline. Please try again later.");
		console.log(error);
	});

	const showError = errorMsg => {
		tweetsDiv.classList.add("hidden");
		errorDiv.classList.remove("hidden");
		errorDiv.innerHTML = errorMsg;
	}
}