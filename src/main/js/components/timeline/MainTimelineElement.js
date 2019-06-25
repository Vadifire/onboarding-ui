import TweetBlock from "./TweetBlock";
import React, { Component } from "react";

// Display List of Tweets or error message
export default class MainTimelineElement extends React.Component {

	render() {
		if (this.props.tweets) {
			const tweets = this.props.tweets.map(tweet => {
				return (
					<TweetBlock key={tweet.url} tweet={tweet}/>
				);
			});

			return <div className="tweets">{tweets}</div>;
		}
		return <div className="error-div">{this.props.message}</div>
	}
}