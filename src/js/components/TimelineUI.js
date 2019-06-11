import React, { Component } from "react";
import TweetBlock from "./TweetBlock";
import "../../css/components/TimelineUI.scss";

// Presentational Component for Timeline
export default class TimelineUI extends React.Component {
	render() {
		let displayedElem; // Either display error or tweets
		if (this.props.error) {
			displayedElem = <div id="error-div">{this.props.error}</div>
		}
		else if (this.props.tweets && Object.keys(this.props.tweets).length > 0) {
			displayedElem = 
				<div id="tweets">{
					this.props.tweets.map((tweet, index) => 
						<div key={tweet.url} className="row">
							<TweetBlock tweet={tweet}/>
						</div>
					)
				}
			</div>;
		} 

		return (
		    <div id="timeline-div">
				<button id="update-timeline" onClick={() => this.props.fetchTweets()}>Update Home Timeline</button>
				{displayedElem}
			</div>
		);
	}

}