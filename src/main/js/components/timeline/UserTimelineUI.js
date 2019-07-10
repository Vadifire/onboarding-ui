import React from "react";
import MainTimelineElement from "./MainTimelineElement";
import "../../../css/components/timeline/UserTimelineUI.scss";
import { fetchUserTimeline } from "../../services/twitter-api";

export default class UserTimelineUI extends React.Component {

	constructor() {
		super();
		this.state = {
			tweets: null,
			message: null
		};
		this.updateCallback = this.updateCallback.bind(this);
	}

	static get apiErrorMessage() {
		return "Failed to fetch tweets from user timeline. Please try again later.";
	}

	static get emptyTimelineMessage() {
		return "No tweets are available, post a tweet!";
	}

	static get updateButtonText() {
		return "Update User Timeline";
	}

	componentDidMount() {
		fetchUserTimeline(this.updateCallback);
	}

	updateCallback(err, tweets) {		
		if (err) {
				this.setState({tweets: null, message: UserTimelineUI.apiErrorMessage});
		} else {
			if (tweets.length) {
				this.setState({tweets: tweets, message: null});
			} else {
				this.setState({tweets : null, message: UserTimelineUI.emptyTimelineMessage});
			}
		}
	}

	render() {
		return (
			<div className="user-timeline timeline-component">
				<div className="button-div">
					<button className="update-timeline"
							onClick={() => fetchUserTimeline(this.updateCallback)}>
						{UserTimelineUI.updateButtonText}
					</button>
				</div>
				<MainTimelineElement tweets={this.state.tweets} message={this.state.message} hideHandle={true}
						includeReplyOption={true}/>
			</div>
		);
	}

}