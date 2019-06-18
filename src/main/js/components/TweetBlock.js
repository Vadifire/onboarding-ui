import React, { Component } from "react";
import "../../css/components/TweetBlock.scss";

export const classNames = {
	CONTENT_DIV: "content-div",
	DATE: "date",
	DISPLAY_NAME: "display-name",
	MESSAGE: "message",
	PROFILE_IMAGE: "profile-image",
	TWEET: "tweet",
	TWEET_LINK: "tweet-link",
	TWITTER_HANDLE: "twitter-handle",
	USER_DIV: "user-div"
};

export default class TweetBlock extends React.Component {
	render() {
		return (
			<div className={classNames.TWEET}>
				<div className={classNames.USER_DIV}>
					<img className={classNames.PROFILE_IMAGE} src={this.props.tweet.user.profileImageUrl}></img>
					<div className={classNames.DISPLAY_NAME}>
						{this.props.tweet.user.name}
					</div>
					<div className={classNames.TWITTER_HANDLE}>
						{this.props.tweet.user.twitterHandle}
					</div>
				</div>
				<div className={classNames.CONTENT_DIV}>
					<div className={classNames.DATE}>
							{this.props.tweet.createdAt}
					</div>
					<div className={classNames.MESSAGE}>
						<a className={classNames.TWEET_LINK} href={this.props.tweet.url}>
							{this.props.tweet.message}
						</a>
					</div>
				</div>
			</div>
		);
	}
}