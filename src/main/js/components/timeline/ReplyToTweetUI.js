import React from "react";
import Modal from "../Modal";
import TweetBlock from "./TweetBlock";
import TweetInput from "../TweetInput";
import { replyToTweet } from "../../services/twitter-api";
import "../../../css/components/timeline/ReplyToTweetUI.scss";

export default class ReplyToTweetUI extends React.Component {

	constructor() {
		super();
		this.state = {
			input: "",
			output: ""
		};

		this.replyCallback = this.replyCallback.bind(this);
		this.updateMessage = this.updateMessage.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static get successMessage() {
		return "Successfully posted tweet.";
	}

	static get failureMessage() {
		return "Could not post tweet.";
	}

	static get replyButtonText() {
		return "Reply";
	}

	static get closeButtonText() {
		return "Cancel";
	}

	replyCallback(err) {
		if (err) {
			this.setState({success: false, output: ReplyToTweetUI.failureMessage});
		} else {
			this.setState({input: "", success: true, output: ReplyToTweetUI.successMessage});
		}
	}

	updateMessage(event) {
		this.setState({input: event.target.value});
	}

	onClose() {
		// Cleanup state before calling parent onClose
		try {
			this.setState({input: "", output: ""});
			this.props.onClose();
		} catch (err) {
			console.log("Failed to close Reply UI.");
		}
	}

	render() {
		return (
			<Modal className="reply-modal" show={this.props.show} onClose={this.onClose}>
				<TweetBlock tweet={this.props.tweet} hideHandle={true}/>
				<TweetInput onChange={this.updateMessage} input={this.state.input} />
				<div className="reply-modal-bottom-div">
					<div className= {"reply-result " + (this.state.success ? "reply-success" : "reply-error")}>
						{this.state.output}
					</div>
					<button className="close-reply-modal-button" onClick={this.onClose}>
						{ReplyToTweetUI.closeButtonText}
					</button>
					<button className="send-reply-button"
							onClick={() => replyToTweet(this.replyCallback, this.props.tweet.tweetId, this.state.input)}
							disabled={!(this.state.input.replace(/\s/g, "").length)}>
						{ReplyToTweetUI.replyButtonText}
					</button>
				</div>
			</Modal>
		);
	}
}