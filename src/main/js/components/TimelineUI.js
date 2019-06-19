import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../css/components/TimelineUI.scss";
import { fetchHomeTimeline } from "../twitter-api";

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

	static get apiErrorMessage() {
		return "Failed to fetch tweets from home timeline. Please try again later.";
	}

	static get emptyTimelineMessage() {
		return "Home timeline is empty.";
	}

	static formatTweet(tweet) {
		tweet.createdAt = new Date(tweet.createdAt).toLocaleString("en-us", {month: "short", day: "numeric"});
		if (!tweet.user) {
			tweet.user = {
				name: "Unknown User"
			};
		}
		return tweet;
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
			const tweets = this.state.tweets.map(tweet => {
				return (
					<div key={tweet.url} className="row">
						<TweetBlock tweet={TimelineUI.formatTweet(tweet)}/>
					</div>
				);
			});
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
			if (tweets.length) { //Fulfillment
				this.setState({tweets: tweets, message: null});
			} else {
				this.setState({tweets : null, message: TimelineUI.emptyTimelineMessage});
			}
		}, () => { //Rejection
			this.setState({tweets: null, message: TimelineUI.apiErrorMessage});
		});
	}
}