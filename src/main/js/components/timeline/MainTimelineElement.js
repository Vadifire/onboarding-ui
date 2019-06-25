import TweetBlock from "./TweetBlock";
import React, { Component } from "react";

// Display List of Tweets or error message
export default class MainTimelineElement extends React.Component {

	static get errorMessage() {
		return "Failed to fetch tweets.";
	}

	render() {
		try {
			if (this.props.tweets) {
				const tweets = this.props.tweets.map(tweet => {
					return (
						<TweetBlock key={tweet.url} tweet={tweet} hideHandle={this.props.hideHandle}/>
					);
				});
				return <div className="tweets">{tweets}</div>;
			} else if (this.props.message) {
				return <div className="error-div">{this.props.message}</div>
			} else {
				return <div className="error-div">{MainTimelineElement.errorMessage}</div>
			}
		} catch { // In case map function cannot be applied to tweets
			return <div className="error-div">{MainTimelineElement.errorMessage}</div>
		}
	}
}