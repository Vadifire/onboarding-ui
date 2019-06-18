import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../css/components/TimelineUI.scss";
import {fetchHomeTimeline} from "../twitter-api";
const _ = require('lodash');

export const errorMessages = {
	API_ERROR_MESSAGE: "Failed to fetch tweets from home timeline. Please try again later.",
	EMPTY_TIMELINE_MESSAGE: "Home timeline is empty."
};

export const classNames = {
	BUTTON: "update-timeline",
	ERROR_DIV: "error-div",
	ROW: "row",
	TIMELINE_DIV: "timeline-div",
	TWEETS: "tweets"
};

export const DEFAULT_NAME = "Unknown User";

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
			displayedElem = <div className={classNames.ERROR_DIV}>{this.state.message}</div>
		}
		if (this.state.tweets) {
			// Map tweets to React Components
			const tweets = this.state.tweets.map(tweet =>
				<div key={tweet.url} className={classNames.ROW}>
					<TweetBlock tweet={tweet}/>
				</div>
			);
			displayedElem = <div className={classNames.TWEETS}>{tweets}</div>;
		} 
		return (
		    <div className={classNames.TIMELINE_DIV}>
				<button className={classNames.BUTTON} onClick={this.updateTimeline}>Update Home Timeline</button>
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
						trimmedTweet.user = {name: DEFAULT_NAME};
					}
					return trimmedTweet;
				});
				this.setState({tweets: trimmedTweets, message: null});
			} else {
				this.setState({tweets : null, message: errorMessages.EMPTY_TIMELINE_MESSAGE});
			}
		}).catch(err => {
			this.setState({tweets: null, message: errorMessages.API_ERROR_MESSAGE});
		});
	}
}