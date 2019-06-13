import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import {fetchHomeTimeline} from "../twitter-api.js";
import "../../css/components/TimelineUI.scss";

// Presentational Component for Timeline
export default class TimelineUI extends React.Component {

	constructor() {
		super();
		this.state = {
			tweets: null,
			error: null
		}
	}

	componentDidMount() {
		this.updateTimeline();
	}

	render() {
		let displayedElem; // Either display error or tweets
		if (this.state.error) {
			displayedElem = <div id="error-div">{this.state.error}</div>
		}
		if (this.state.tweets) {
			displayedElem = 
				<div id="tweets">
				{
					this.state.tweets.map(tweet => 
						<div key={tweet.url} className="row">
							<TweetBlock tweet={tweet}/>
						</div>
					)
				}
				</div>;
		} 
		return (
		    <div id="timeline-div">
				<button id="update-timeline" onClick={()=>this.updateTimeline()}>Update Home Timeline</button>
				{displayedElem}
			</div>
		);
	}

	updateTimeline() {
		fetchHomeTimeline().then(tweets => {
			if (tweets.length > 0) {
				this.setState({tweets, error: null});
			} else {
				this.setState({tweets : null, error: "Home timeline is empty."});
			}
		}).catch(() => {
			this.setState({tweets: null, error: "Failed to fetch tweets from home timeline. Please try again later."});
		});
	}

}