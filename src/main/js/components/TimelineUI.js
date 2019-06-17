import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../css/components/TimelineUI.scss";
import {fetchHomeTimeline} from "../twitter-api.js";
const _ = require('lodash');

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

	updateTimeline() {
		return fetchHomeTimeline().then(tweets => {
			if (tweets.length) {
				const trimmedTweets = tweets.map(tweet => {
					const trimmedTweet = _.pick(tweet, "message", "url", "createdAt", "user");
					trimmedTweet.createdAt = new Date(trimmedTweet.createdAt)
							.toLocaleString("en-us", {month: "short", day: "numeric"});
					if (!trimmedTweet.user) {
						trimmedTweet.user = {name: "Unknown User"};
					}
					return trimmedTweet;
				});
				this.setState({tweets: trimmedTweets, message: null});
			} else {
				this.setState({tweets : null, message: "Home timeline is empty."});
			}
		}).catch(err => {
			this.setState({tweets: null, message: "Failed to fetch tweets from home timeline. Please try again later."});
		});
	}

}