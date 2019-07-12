import TweetBlock from "./TweetBlock";
import React from "react";

// Display List of Tweets or error message
export default class MainTimelineElement extends React.Component {
	
	static get errorMessage() {
		return "Failed to fetch tweets.";
	}

	static get loadingMessage() {
		return "Loading timeline...";
	}

	render() {
		function renderMessage(msg) {
			return (
				<div className="timeline-container">
					<div className="timeline-message">
						{msg}
					</div>
				</div>
			);
		}

		try {
			if (this.props.tweets) {
				const tweets = this.props.tweets.map(tweet => {
					return (
						<TweetBlock key={tweet.url} tweet={tweet} hideHandle={this.props.hideHandle}
								openReplyFunction={this.props.openReplyFunction}/>
					);
				});
				return <div className="timeline-container">{tweets}</div>;
			} else if (this.props.message) {
				return renderMessage(this.props.message);
			} else { // Nothing passed to this component yet
				return renderMessage(MainTimelineElement.loadingMessage);
			}
		} catch (err) { // In case map function cannot be applied to tweets
			return renderMessage(MainTimelineElement.errorMessage);
		}
	}
}