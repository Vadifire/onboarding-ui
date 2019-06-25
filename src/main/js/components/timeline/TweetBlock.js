import React, { Component } from "react";
import "../../../css/components/timeline/TweetBlock.scss";

export default class TweetBlock extends React.Component {

	static formatTweet(tweet) {
		const formattedTweet = {};
		Object.assign(formattedTweet, tweet);
		formattedTweet.createdAt = new Date(formattedTweet.createdAt)
				.toLocaleString("en-us", {month: "short", day: "numeric"});
		if (!formattedTweet.user) {
			formattedTweet.user = {
				name: "Unknown User"
			};
		}
		return formattedTweet;
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
					{this.props.hideHandle ? (
						null
					) : (
						<div className="twitter-handle">
							{tweet.user.twitterHandle}
						</div>
					)}
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