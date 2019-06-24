import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../../css/components/timeline/TimelineUI.scss";

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
		return "No tweets are available, post a tweet!";
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
				<h2>{this.props.title}</h2>
				<div className="button-div">
					<button className="update-timeline" onClick={this.updateTimeline}>{this.props.buttonName}</button>
				</div>
				{displayedElem}
			</div>
		);
	}

	updateTimeline() {
		this.props.apiCall((err, tweets) => {
			if (err) {
				this.setState({tweets: null, message: TimelineUI.apiErrorMessage});
			} else {
				if (tweets.length) {
					this.setState({tweets: tweets, message: null});
				} else {
					this.setState({tweets : null, message: TimelineUI.emptyTimelineMessage});
				}
			}
		});
	}
}