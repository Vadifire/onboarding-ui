import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../../css/components/timeline/HomeTimelineUI.scss";
import { fetchHomeTimeline } from "../../twitter-api";

export default class HomeTimelineUI extends React.Component {

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

	static get buttonText() {
		return "Update " + HomeTimelineUI.timelineName;
	}

	static get timelineName() {
		return "Home Timeline";
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
					<TweetBlock key={tweet.url} tweet={HomeTimelineUI.formatTweet(tweet)}/>
				);
			});
			displayedElem = <div className="tweets">{tweets}</div>;
		} 
		return (
			<div className="home-timeline timeline-comp">
				<h3 className="title">{HomeTimelineUI.timelineName}</h3>
				<div className="button-div">
					<button className="update-timeline" onClick={this.updateTimeline}>{HomeTimelineUI.buttonText}</button>
				</div>
				{displayedElem}
			</div>
		);
	}

	updateTimeline() {
		fetchHomeTimeline((err, tweets) => {
			if (err) {
				this.setState({tweets: null, message: HomeTimelineUI.apiErrorMessage});
			} else {
				if (tweets.length) {
					this.setState({tweets: tweets, message: null});
				} else {
					this.setState({tweets : null, message: HomeTimelineUI.emptyTimelineMessage});
				}
			}
		});
	}
}