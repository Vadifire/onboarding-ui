import React from "react";
import TabContainer from "./TabContainer";
import ReplyToTweetUI from "./timeline/ReplyToTweetUI";
import "../../css/components/Application.scss";

export default class Application extends React.Component {

	constructor() {
		super();
		this.state = {
			showReplyModal: false,
			tweetBeingRepliedTo: null
		};
		this.closeReplyModal = this.closeReplyModal.bind(this);
		this.openReplyModal = this.openReplyModal.bind(this);
	}

	openReplyModal(tweet) {
		this.setState(
			{
				showReplyModal: true,
				tweetBeingRepliedTo: tweet
			}
		);
	}

	closeReplyModal() {
		this.setState({showReplyModal: false});
	}

	render() {
		return (
			<React.Fragment>
				<div className="title">Lab for Cedric</div>
				<TabContainer openReplyFunction={this.openReplyModal}/>
				{
					this.state.showReplyModal ? (
						<ReplyToTweetUI tweet={this.state.tweetBeingRepliedTo} 
								onClose={this.closeReplyModal}/>
					) : (
						null
					)
				}
			</React.Fragment>
		);
	}
}