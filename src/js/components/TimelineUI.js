import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../css/components/TimelineUI.scss";

export default class TimelineUI extends React.Component {

	constructor() {
		super();
		this.state = {};
		this.fetchTweets();
	}

	render() {
		let displayedElem; // Either display error or tweets
		if (this.state.error) {
			displayedElem = <div id="error-div">{this.state.error}</div>
		}
		else if (this.state.tweets) {
			displayedElem = 
				<div id="tweets">{
					this.state.tweets.map((tweet, index) => 
						<div key={tweet.url} className="row">
							<TweetBlock className="tweet" tweet={tweet}/>
						</div>
					)
				}
			</div>;
		} 

		return (
		    <div id={this.props.id}>
				<button id="update-timeline" onClick={() => this.fetchTweets()}>Update Home Timeline</button>
		    	{displayedElem}
			</div>
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
				this.showTweets(responseJson);
			} else {
				this.showError("Home timeline is empty.");
			}
		}).catch(error => { // Failed to fetch tweets
			this.showError("Failed to fetch home timeline. Please try again later.");
			console.log(error);
		});
	}

	showTweets(tweets) {
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
				error: null
			}
		});
	}

	showError(message) {
		this.setState(() => {
			return { 
				tweets: null,
				error: message
			}
		});
	}
}