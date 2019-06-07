import React, { Component } from "react";

const OK_RESPONSE_CODE = 200;

class TimelineContainer extends React.Component {

	constructor() {
		super();
		this.state = {};
		this.pullTweets();
	}

	render() {
		return (
		    <div id={this.props.id}>
				<button id="update-timeline" onClick={() => this.pullTweets()}>Update Home Timeline</button>
				<div id="error-div">{this.state.error}</div>
				<div id="tweets">{this.state.tweets}</div>
			</div>
		);
	}

	pullTweets() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == XMLHttpRequest.DONE) {
				if (this.status == OK_RESPONSE_CODE) {
					var tweets = JSON.parse(this.responseText);
					if (tweets.length > 0) {
						this.showTweets(tweets);
					} else {
						this.showError("Home timeline is empty.");
					}
				} else {
					if (this.response) { // Log error
						console.error("Server responded with error: " + this.response);
					} else {
						console.error("Connection to tweeting server failed.");
					}
					this.showError("Failed to fetch home timeline. Please try again later.");
				}
			}
		}
		xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
		xhttp.send();
	}

	showTweets(tweets) {
		this.setState((prevState, props) => {
			return { 
				tweets: tweets, 
				error: null,
			}
		});
	}

	showError(message) {
		this.setState((prevState, props) => {
			return { 
				tweets: null,
				error: message,
			}
		});
	}
}

export default TimelineContainer;