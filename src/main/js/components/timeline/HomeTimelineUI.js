import React, { Component } from "react";
import MainTimelineElement from "./MainTimelineElement";
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

	componentDidMount() {
		this.updateTimeline();
	}

	render() {
		return (
			<div className="home-timeline timeline-comp">
				<h3 className="title">{HomeTimelineUI.timelineName}</h3>
				<div className="button-div">
					<button className="update-timeline" onClick={this.updateTimeline}>{HomeTimelineUI.buttonText}</button>
				</div>
				<MainTimelineElement tweets={this.state.tweets} message={this.state.message}/>
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