import React from "react";

import TweetInput from "./TweetInput";
import { postTweet } from "../services/twitter-api";

import "../../css/components/PostTweetUI.scss";

export default class PostTweetUI extends React.Component {

	constructor() {
		super();
		this.state = {
			input: "",
			output: "",
			success: false
		};
		this.postCallback = this.postCallback.bind(this);
		this.updateMessage = this.updateMessage.bind(this);
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

	postCallback(err) {
		if (err) {
			this.setState({output: PostTweetUI.failureMessage, success: false});
		} else {
			this.setState({input: "", output: PostTweetUI.successMessage, success: true});
		}
	}

	render() {
		return (
			<div className="post-tweet-ui">
				<TweetInput onChange={this.updateMessage} input={this.state.input}/>
				<div className="post-bottom-div">
					<div className= {"post-result " + (this.state.success ? "post-success" : "post-error")}>
						{this.state.output}
					</div>
					<button className="post-tweet"
							onClick={() => postTweet(this.postCallback, this.state.input)}
							disabled={!(this.state.input.replace(/\s/g, "").length)}>
						{PostTweetUI.buttonText}
					</button>
				</div>
			</div>
		);
	}
}