import React from "react";
import Modal from "../Modal";
import TweetBlock from "./TweetBlock";
import { maxTweetLength } from "../../services/twitter-api";

export default class ReplyModal extends React.Component {

	constructor() {
		super();
		this.state = {
			showReply: false,
			input: ""
		};

		this.handleReply = this.handleReply.bind(this);
		this.openReplyModal = this.openReplyModal.bind(this);
		this.closeReplyModal = this.closeReplyModal.bind(this);
		this.updateMessage = this.updateMessage.bind(this);
	}

	static get replyButtonText() {
		return "Reply";
	}

	static get closeButtonText() {
		return "Close";
	}

	handleReply() {
		alert("To implement");
	}

	updateMessage(event) {
		this.setState({input: event.target.value});
	}

	openReplyModal() {
		this.setState({showReply: true});
	}

	closeReplyModal() {
		this.setState({showReply: false});
	}

	render() {
		return (
			<React.Fragment>
				<div className="open-reply" onClick={this.openReplyModal}>
					<i className="fas fa-comment fa-2x"></i>
				</div>
				<Modal className="reply-modal" show={this.state.showReply} onClose={this.closeReplyModal}>
					<TweetBlock tweet={this.props.tweet} />
					<div className="reply-input-container">
						<div className="char-count">
							{this.state.input.length + " / " + maxTweetLength}
						</div>
						<textarea type="text" className="reply-input" onChange={this.updateMessage} 
							maxLength={maxTweetLength} value={this.state.input}>
						</textarea>
					</div>
					<div className="reply-modal-buttons-div">
						<button className="close-reply-modal-button" onClick={this.closeReplyModal}>
							{ReplyModal.closeButtonText}
						</button>
						<button className="send-reply-button" onClick={this.handleReply}>
							{ReplyModal.replyButtonText}
						</button>
					</div>
				</Modal>
			</React.Fragment>
		);
	}
}