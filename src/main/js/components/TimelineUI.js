import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../css/components/TimelineUI.scss";
import {fetchHomeTimeline} from "../twitter-api";
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

	static get DEFAULT_NAME() {
		return "Unknown User";
	}

	static get API_ERROR_MESSAGE() {
		return "Failed to fetch tweets from home timeline. Please try again later.";
	}

	static get EMPTY_TIMELINE_MESSAGE() {
		return "Home timeline is empty.";
	}

	static extractTweets(response) {
		return response.map(tweet => {
			const trimmedTweet = _.pick(tweet, "message", "url", "createdAt", "user");
			trimmedTweet.createdAt = new Date(trimmedTweet.createdAt)
					.toLocaleString("en-us", {month: "short", day: "numeric"});
			if (!trimmedTweet.user) {
				trimmedTweet.user = {name: TimelineUI.DEFAULT_NAME};
			}
			return trimmedTweet;
		});
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
		return fetchHomeTimeline().then(tweets => {
			if (tweets.length) {
				this.setState({tweets: TimelineUI.extractTweets(tweets), message: null});
			} else {
				this.setState({tweets : null, message: TimelineUI.EMPTY_TIMELINE_MESSAGE});
			}
		}).catch(err => {
			this.setState({tweets: null, message: TimelineUI.API_ERROR_MESSAGE});
		});
	}
}