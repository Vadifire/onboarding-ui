import React, { Component } from "react";
import TimelineUI from "./TimelineUI";
import { fetchHomeTimeline } from "../../twitter-api";
import "../../../css/components/timeline/HomeTimeline.scss";

export default class HomeTimelineUI extends React.Component {

	static get buttonName() {
		return "Update Home Timeline";
	}

	static get title() {
		return "Home Timeline";
	}

	render() {
		return (
			<div className="home-timeline timeline-comp">
				<TimelineUI  apiCall={fetchHomeTimeline} buttonName={HomeTimelineUI.buttonName} 
						title={HomeTimelineUI.title}/>
			</div>
		);
	}
}