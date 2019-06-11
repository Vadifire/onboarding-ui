import React, { Component } from "react";

export default class TimelineUI extends React.Component {

	constructor() {
		super();
		this.state = {};
		this.fetchTweets();
	}

	render() {
		let mainElem;
		if (this.state.tweets) {
			mainElem = 
				<div id="tweets">{
					this.state.tweets.map((tweet, index) => 
						<div key={index} className="row">
							<div className="tweet">
								<div className="user-div">
									<img className="profile-image" src={tweet.user.profileImageUrl}>
									</img>
									<div className="display-name">
										{tweet.user.name}
									</div>
									<div className="twitter-handle">
										{tweet.user.twitterHandle}
									</div>
								</div>
								<div className="content-div">
									<div className="date">{
											new Date(tweet.createdAt).toLocaleString("en-us", 
													{month: "short", day: "numeric"}
											)
										}
									</div>
									<div className="message">
										<a className="tweet-link">
											{tweet.message}
										</a>
									</div>
								</div>
							</div>
						</div>
					)
				}
			</div>;
		}
		if (this.state.error) {
			mainElem = <div id="error-div">{this.state.error}</div>
		}

		return (
		    <div id={this.props.id}>
				<button id="update-timeline" onClick={() => this.fetchTweets()}>Update Home Timeline</button>
				{mainElem}
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
		tweets.map(tweet => { // Populate default values to avoid reference error
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