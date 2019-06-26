import React, { Component } from "react";
import "../../../css/components/timeline/TweetBlock.scss";

export default class TweetBlock extends React.Component {

	render() {
		try {
			return (
				<div className="tweet">
					<div className="user-div">
						<img className="profile-image" src={this.props.tweet.user.profileImageUrl}></img>
						<div className="display-name">
							{this.props.tweet.user.name}
						</div>
						{this.props.hideHandle ? (
							null
						) : (
							<div className="twitter-handle">
								{this.props.tweet.user.twitterHandle}
							</div>
						)}
					</div>
					<div className="content-div">
						<div className="date">
							{new Date(this.props.tweet.createdAt)
									.toLocaleString("en-us", {month: "short", day: "numeric"})}
						</div>
						<div className="message">
							<a className="tweet-link" href={this.props.tweet.url}>
								{this.props.tweet.message}
							</a>
						</div>
					</div>
				</div>
			);
		} catch (err) {
			// tweet and tweet.user props should always be defined. If not, don't render this block.
			return null;
		}
	}
}