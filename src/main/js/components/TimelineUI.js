import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../css/components/TimelineUI.scss";

// Presentational Component for Timeline
export default class TimelineUI extends React.Component {

	constructor() {
		super();
		this.state = {
			tweets: null,
			message: null
		}

		this.updateTimeline = this.updateTimeline.bind(this);
	}

	componentDidMount() {
		this.updateTimeline();
	}

	render() {
		let displayedElem; // Either display message or tweets
		if (this.state.message) {
			displayedElem = <div id="error-div">{this.state.message}</div>
		}
		if (this.state.tweets) {
			// Map tweets to React Components
			const tweets = this.state.tweets.map(tweet =>
				<div key={tweet.url} className="row">
					<TweetBlock tweet={tweet}/>
				</div>
			);
			displayedElem = <div id="tweets">{tweets}</div>;
		} 
		return (
		    <div id="timeline-div">
				<button id="update-timeline" onClick={this.updateTimeline}>Update Home Timeline</button>
				{displayedElem}
			</div>
		);
	}

	// Property 'fetchTimeline' must point to function that returns Promise with tweets
	updateTimeline() {
		this.props.fetchTimeline().then(tweets => {
			if (tweets.length > 0) {
				const trimmedTweets = tweets.map(tweet => { // Only copy information we need
					return {
							createdAt: tweet.createdAt,
							message: tweet.message,
							url: tweet.url,
							user: {
								name: tweet.user.name,
								profileImageUrl: tweet.user.profileImageUrl,
								twitterHandle: tweet.user.twitterHandle
							}
					};
				});
				this.setState({tweets: trimmedTweets, message: null});
			} else {
				this.setState({tweets : null, message: "Home timeline is empty."});
			}
		}).catch(err => {
			console.log(err);
			this.setState({tweets: null, message: "Failed to fetch tweets from home timeline. Please try again later."});
		});
	}

}