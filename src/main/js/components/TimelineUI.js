import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../css/components/TimelineUI.scss";
import {fetchHomeTimeline} from "../twitter-api";
const _ = require('lodash');

export const errorMessages = {
	API_ERROR_MESSAGE: "Failed to fetch tweets from home timeline. Please try again later.",
	EMPTY_TIMELINE_MESSAGE: "Home timeline is empty."
};

export const DEFAULT_NAME = "Unknown User";

// Utility function that defines what UI actually wants to use in state
export function extractTweets(response) {
	return response.map(tweet => {
		const trimmedTweet = _.pick(tweet, "message", "url", "createdAt", "user");
		trimmedTweet.createdAt = new Date(trimmedTweet.createdAt)
				.toLocaleString("en-us", {month: "short", day: "numeric"});
		if (!trimmedTweet.user) {
			trimmedTweet.user = {name: DEFAULT_NAME};
		}
		return trimmedTweet;
	});
}

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
			displayedElem = <div className="error-div">{this.state.message}</div>
		}
		if (this.state.tweets) {
			// Map tweets to React Components
			const tweets = this.state.tweets.map(tweet =>
				<div key={tweet.url} className="row">
					<TweetBlock tweet={tweet}/>
				</div>
			);
			displayedElem = <div className="tweets">{tweets}</div>;
		} 
		return (
		    <div className="timeline-div">
				<button className="update-timeline" onClick={this.updateTimeline}>Update Home Timeline</button>
				{displayedElem}
			</div>
		);
	}

	updateTimeline() {
		fetchHomeTimeline(tweets => {
			if (tweets) {
				if (tweets.length) {
					this.setState({tweets: extractTweets(tweets), message: null});
				} else {
					this.setState({tweets : null, message: errorMessages.EMPTY_TIMELINE_MESSAGE});
				}
			} else {
				this.setState({tweets: null, message: errorMessages.API_ERROR_MESSAGE});
			}
		});
	}
}