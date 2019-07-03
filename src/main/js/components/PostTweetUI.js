import React from "react";
import "../../css/components/PostTweetUI.scss";
import { maxTweetLength, postTweet } from "../services/twitter-api";

export default class PostTweetUI extends React.Component {

	constructor() {
		super();
		this.state = {
			input: "",
			output: ""
		};
		this.updateMessage = this.updateMessage.bind(this);
		this.submitTweet = this.submitTweet.bind(this);
	}

	static get buttonText() {
		return "Post";
	}

	static get successMessage() {
		return "Successfully posted tweet.";
	}

	static get failureMessage() {
		return "Could not post tweet.";
	}

	updateMessage(event) {
		this.setState({input: event.target.value});
	}

	submitTweet() {
		postTweet((err) => {
			if (err) {
				this.setState({output: PostTweetUI.failureMessage});
			} else {
				this.setState({input: "", output: PostTweetUI.successMessage});
			}
		}, this.state.input);
	}

	render() {
		return (
			<div className="post-tweet-ui">
				<div className="input-container">
					<div className="char-count">
						{this.state.input.length + " / " + maxTweetLength}
					</div>
					<textarea type="text" className="tweet-input" onChange={this.updateMessage} 
						maxLength={maxTweetLength} value={this.state.input}>
					</textarea>
				</div>
				<div className="post-bottom-div">
					<div className="post-result">
						{this.state.output}
					</div>
					<button className="post-tweet" onClick={this.submitTweet}
								disabled={!(this.state.input.replace(/\s/g, "").length)}>
						{PostTweetUI.buttonText}
					</button>
				</div>
			</div>
		);
	}
}