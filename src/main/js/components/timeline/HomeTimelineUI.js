import React from "react";
import MainTimelineElement from "./MainTimelineElement";
import "../../../css/components/timeline/HomeTimelineUI.scss";
import KeyCode from "keycode-js";
import { fetchHomeTimeline, fetchFilteredHomeTimeline } from "../../services/twitter-api";

export default class HomeTimelineUI extends React.Component {

	constructor() {
		super();
		this.state = {
			tweets: null,
			message: null,
			keyword: ""
		};
		this.updateTimeline = this.updateTimeline.bind(this);
		this.updateFilter = this.updateFilter.bind(this);
		this.filterTimeline = this.filterTimeline.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	static get apiErrorMessage() {
		return "Failed to fetch tweets from home timeline. Please try again later.";
	}

	static get emptyTimelineMessage() {
		return "No tweets are available, post a tweet!";
	}

	static get noResultsForFilterMessage() {
		return "No tweets match the filter.";
	}

	static get updateButtonText() {
		return "Update " + HomeTimelineUI.timelineName;
	}

	static get filterButtonText() {
		return "Filter";
	}

	static get timelineName() {
		return "Home Timeline";
	}

	componentDidMount() {
		this.updateTimeline();
	}

	render() {
		return (
			<div className="home-timeline timeline-component">
				<h3 className="title">{HomeTimelineUI.timelineName}</h3>
				<div className="button-div">
					<button className="update-timeline" onClick={this.updateTimeline}>
						{HomeTimelineUI.updateButtonText}
					</button>
					<input type="text" className="filter-input" onChange={this.updateFilter} 
							onKeyPress={this.handleKeyPress}>
					</input>
					<button className="filter-timeline" onClick={this.filterTimeline} 
							disabled={!this.state.keyword.length}>
						{HomeTimelineUI.filterButtonText}
					</button>
				</div>
				<MainTimelineElement tweets={this.state.tweets} message={this.state.message}/>
			</div>
		);
	}

    updateTimeline() {
		fetchHomeTimeline((err, tweets) => {
			if (err) {
				this.setState({tweets: null, message: HomeTimelineUI.apiErrorMessage});
			} else {
				if (tweets.length) {
					this.setState({tweets: tweets, message: null});
				} else {
					this.setState({tweets : null, message: HomeTimelineUI.emptyTimelineMessage});
				}
			}
		});
	}

	handleKeyPress(event) {
		if ((event.charCode === KeyCode.KEY_RETURN || event.charCode === KeyCode.KEY_ENTER)
					&& this.state.keyword.length) {
			this.filterTimeline();
		}
	}

	updateFilter(event) {
		this.setState({keyword: event.target.value});
	}

	filterTimeline() {
		fetchFilteredHomeTimeline((err, tweets) => {
			if (err) {
				this.setState({tweets: null, message: HomeTimelineUI.apiErrorMessage});
			} else {
				if (tweets.length) {
					this.setState({tweets: tweets, message: null});
				} else {
					this.setState({tweets : null, message: HomeTimelineUI.noResultsForFilterMessage});
				}
			}
		}, this.state.keyword);
	}
}