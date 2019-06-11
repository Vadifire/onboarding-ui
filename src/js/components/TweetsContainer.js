import React, { Component } from "react";
import TimelineUI from "./TimelineUI";

// Container Component currently used for TimelineUI
export default class TweetsContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			error: "",
			tweets: {}
		};
		this.fetchTweets();
	}

	render() {
		return (
			<TimelineUI error={this.state.error} tweets={this.state.tweets} fetchTweets={() => this.fetchTweets()}/>
		);
	}

	fetchTweets() {
		fetch("http://localhost:8080/api/1.0/twitter/timeline").then(response => { // Attempt to fetch tweets
			if (response.ok === true) {
				return response.json();
			} else {
				return Promise.reject(new Error("Failed to fetch tweets. Server responded with status code: " + 
						response.status + ", error message: " + response.statusText));
			}
		}).then(responseJson => { // Got JSON
			if (responseJson.length > 0) {
				this.setTweets(responseJson);
			} else {
				this.setError("Home timeline is empty.");
			}
		}).catch(error => { // Failed to fetch tweets
			this.setError("Failed to fetch home timeline. Please try again later.");
			console.log(error);
		});
	}

	setTweets(tweets) {
		tweets.map(tweet => { // Populate default value to avoid reference error
			if (!tweet.user) {
				tweet.user = {
					name: "Unknown Handle"
				}
			}
			return tweet;
		});
		this.setState(() => {
			return { 
				tweets: tweets, 
				error: ""
			}
		});
	}

	setError(message) {
		this.setState(() => {
			return { 
				tweets: {},
				error: message
			}
		});
	}
}