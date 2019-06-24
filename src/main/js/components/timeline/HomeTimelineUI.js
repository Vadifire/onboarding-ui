import React, { Component } from "react";
import TimelineUI from "./TimelineUI";
import { fetchHomeTimeline } from "../../twitter-api";
import "../../../css/components/timeline/HomeTimeline.scss";

export default class HomeTimelineUI extends React.Component {

	static get buttonName() {
		return "Update Home Timeline";
	}

	render() {
		return (
			<div className="home-timeline">
				<TimelineUI apiCall={fetchHomeTimeline} buttonName={HomeTimelineUI.buttonName} title="Home Timeline"/>
			</div>
		);
	}
}