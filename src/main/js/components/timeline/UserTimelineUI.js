import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../../css/components/timeline/UserTimelineUI.scss";
import { fetchUserTimeline } from "../../twitter-api";

export default class UserTimelineUI extends React.Component {

	constructor() {
		super();
		this.state = {
			tweets: null,
			message: null
		}
		this.updateTimeline = this.updateTimeline.bind(this);
	}

	static get apiErrorMessage() {
		return "Failed to fetch tweets from user timeline. Please try again later.";
	}

	static get emptyTimelineMessage() {
		return "No tweets are available, post a tweet!";
	}

	static get buttonText() {
		return "Update " + UserTimelineUI.timelineName;
	}

	static get timelineName() {
		return "User Timeline";
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
					<TweetBlock key={tweet.url} tweet={tweet}/>
				);
			});
			displayedElem = <div className="tweets">{tweets}</div>;
		} 
		return (
			<div className="user-timeline timeline-comp">
				<h3 className="title">{UserTimelineUI.timelineName}</h3>
				<div className="button-div">
					<button className="update-timeline" onClick={this.updateTimeline}>{UserTimelineUI.buttonText}</button>
				</div>
				{displayedElem}
			</div>
		);
	}

	updateTimeline() {
		fetchUserTimeline((err, tweets) => {
			if (err) {
				this.setState({tweets: null, message: UserTimelineUI.apiErrorMessage});
			} else {
				if (tweets.length) {
					this.setState({tweets: tweets, message: null});
				} else {
					this.setState({tweets : null, message: UserTimelineUI.emptyTimelineMessage});
				}
			}
		});
	}
}