import React, { Component } from "react";
import "../../../css/components/timeline/TweetBlock.scss";

export default class TweetBlock extends React.Component {

	static formatTweet(tweet) {
		tweet.createdAt = new Date(tweet.createdAt).toLocaleString("en-us", {month: "short", day: "numeric"});
		if (!tweet.user) {
			tweet.user = {
				name: "Unknown User"
			};
		}
		return tweet;
	}

	render() {
		const tweet = TweetBlock.formatTweet(this.props.tweet);
		return (
			<div className="tweet">
				<div className="user-div">
					<img className="profile-image" src={tweet.user.profileImageUrl}></img>
					<div className="display-name">
						{tweet.user.name}
					</div>
					<div className="twitter-handle">
						{tweet.user.twitterHandle}
					</div>
				</div>
				<div className="content-div">
					<div className="date">
						{tweet.createdAt}
					</div>
					<div className="message">
						<a className="tweet-link" href={tweet.url}>
							{tweet.message}
						</a>
					</div>
				</div>
			</div>
		);
	}
}