import React, { Component } from "react";
import {fetchHomeTimeline} from "../twitter-api.js";
import TweetBlock from "./TweetBlock";
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
		else if (this.state.tweets) {
			displayedElem = 
				<div id="tweets">{
					this.state.tweets.map((tweet, index) => 
						<div key={tweet.url} className="row">
							<TweetBlock tweet={tweet}/>
						</div>
					)
				}
			</div>;
		} 
		return (
		    <div id="timeline-div">
				<button id="update-timeline" onClick={this.updateTimeline.bind(this)}>Update Home Timeline</button>
				{displayedElem}
			</div>
		);
	}

	updateTimeline() {
		fetchHomeTimeline().then(response => {
			this.setState(response);
		});
	}

}