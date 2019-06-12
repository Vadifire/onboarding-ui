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
		fetchHomeTimeline().then(response => {
			console.log(response)
			this.setState(response);
		});
	}

	render() {
		let displayedElem; // Either display error or tweets
		if (this.state.error) {
			displayedElem = <div id="error-div">{this.state.error}</div>
		}
		else if (this.state.tweets) {
			console.log(this.state.tweets);
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
				<button id="update-timeline" onClick={() => fetchHomeTimeline()}>Update Home Timeline</button>
				{displayedElem}
			</div>
		);
	}

}