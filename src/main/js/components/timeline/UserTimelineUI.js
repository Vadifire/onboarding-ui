import React, { Component } from "react";
import TimelineUI from "./TimelineUI";
import { fetchUserTimeline } from "../../twitter-api";

export default class UserTimelineUI extends React.Component {

	static get buttonName() {
		return "Update User Timeline";
	}

	render() {
		return (
			<React.Fragment>
				<TimelineUI apiCall={fetchUserTimeline} buttonName={UserTimelineUI.buttonName} title="User Timeline" />
			</React.Fragment>
		);
	}
}