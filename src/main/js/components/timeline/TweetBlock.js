import React from "react";
import ReplyToTweetUI from "./ReplyToTweetUI";
import "../../../css/components/timeline/TweetBlock.scss";

export default class TweetBlock extends React.Component {

	static get defaultDisplayName() {
		return "Unknown User";
	}

	static formatDate(date) {
		return new Date(date).toLocaleString("en-us", {month: "short", day: "numeric"});
	}

	render() {
		try {
			return (
				<div className="tweet">
					<div className="user-div">
						{this.props.tweet.user ? (
							<React.Fragment>
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
							</React.Fragment>
						) : (
							<div className="display-name">{TweetBlock.defaultDisplayName}</div>
						)}
					</div>
					<div className="content-div">
						<div className="date">
							{TweetBlock.formatDate(this.props.tweet.createdAt)}
						</div>
						<div className="message">
							<a className="tweet-link" href={this.props.tweet.url}>
								{this.props.tweet.message}
							</a>
						</div>
						{this.props.includeReplyOption ? (
							<ReplyToTweetUI tweet={this.props.tweet}/>
						) : (
							null
						)}
					</div>
				</div>
			);
		} catch (err) {
			return null;
		}
	}
}