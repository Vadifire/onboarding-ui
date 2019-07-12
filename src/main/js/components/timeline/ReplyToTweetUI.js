import React from "react";
import Modal from "../Modal";
import TweetBlock from "./TweetBlock";
import { maxTweetLength, replyToTweet } from "../../services/twitter-api";
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

	render() {
		return (
			<React.Fragment>
				<Modal className="reply-modal" onClose={this.props.onClose}>
					<TweetBlock tweet={this.props.tweet} hideHandle={true}/>
					<div className="reply-input-container">
						<div className="char-count">
							{this.state.input.length + " / " + maxTweetLength}
						</div>
						<textarea type="text" className="reply-input" onChange={this.updateMessage} 
							maxLength={maxTweetLength} value={this.state.input}>
						</textarea>
					</div>
					<div className="reply-modal-bottom-div">
						<div className= {"reply-result " + (this.state.success ? "reply-success" : "reply-error")}>
							{this.state.output}
						</div>
						<button className="close-reply-modal-button" onClick={this.closeReplyModal}>
							{ReplyToTweetUI.closeButtonText}
						</button>
						<button className="send-reply-button" 
								onClick={() => replyToTweet(this.replyCallback, this.props.tweet.tweetId, this.state.input)}
								disabled={!(this.state.input.replace(/\s/g, "").length)}>
							{ReplyToTweetUI.replyButtonText}
						</button>
					</div>
				</Modal>
			</React.Fragment>
		);
	}
}