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
		fetchHomeTimeline().then(response => {
			this.setState({tweets : response.tweets, error: response.error});
		});
	}

}