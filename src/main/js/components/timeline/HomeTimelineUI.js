import React, { Component } from "react";
import TimelineUI from "./TimelineUI";
import { fetchHomeTimeline } from "../../twitter-api";

export default class HomeTimelineUI extends React.Component {

	static get buttonName() {
		return "Update Home Timeline";
	}

	render() {
		return (
			<React.Fragment>
				<TimelineUI apiCall={fetchHomeTimeline} buttonName={HomeTimelineUI.buttonName} title="Home Timeline" />
			</React.Fragment>
		);
	}
}