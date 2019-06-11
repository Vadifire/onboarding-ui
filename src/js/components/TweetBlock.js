import React, { Component } from "react";
import "../../css/components/TweetBlock.scss";

export default class TweetBlock extends React.Component {
	render() {
		return (
			<div className={this.props.className}>
				<div className="user-div">
					<img className="profile-image" src={this.props.tweet.user.profileImageUrl}>
					</img>
					<div className="display-name">
						{this.props.tweet.user.name}
					</div>
					<div className="twitter-handle">
						{this.props.tweet.user.twitterHandle}
					</div>
				</div>
				<div className="content-div">
					<div className="date">{
							new Date(this.props.tweet.createdAt).toLocaleString("en-us", 
									{month: "short", day: "numeric"}
							)
						}
					</div>
					<div className="message">
						<a className="tweet-link" href={this.props.tweet.url}>
							{this.props.tweet.message}
						</a>
					</div>
				</div>
			</div>
		);
	}
}