import React from "react";

import {maxTweetLength} from "../services/twitter-api.js";

import "../../css/components/TweetInput.scss";

export default class TweetInput extends React.Component {

	render () {
		return (
			<div className="input-container">
				<div className="char-count">
					{this.props.input.length + " / " + maxTweetLength}
				</div>
				<textarea type="text" 
						className="tweet-input" 
						onChange={this.props.onChange}
						maxLength={maxTweetLength}
						value={this.props.input} />
			</div>
		);
	}
}