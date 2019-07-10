import React from "react";
import "../../../css/components/timeline/TweetBlock.scss";
//import Modal from 'react-responsive-modal';
import Modal from "../Modal";
import { maxTweetLength } from "../../services/twitter-api";

export default class TweetBlock extends React.Component {

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

	static get defaultDisplayName() {
		return "Unknown User";
	}

	static get replyButtonText() {
		return "Reply";
	}

	static get closeButtonText() {
		return "Close";
	}

	static formatDate(date) {
		return new Date(date).toLocaleString("en-us", {month: "short", day: "numeric"});
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
					</div>
					{this.props.includeReplyOption ? (
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
										{TweetBlock.closeButtonText}
									</button>
									<button className="send-reply-button" onClick={this.handleReply}>
										{TweetBlock.replyButtonText}
									</button>
								</div>
							</Modal>
						</React.Fragment>
					) : (
						null
					)}
				</div>
			);
		} catch (err) {
			return null;
		}
	}
}