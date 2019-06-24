import React, { Component } from "react";
import TimelineUI from "./TimelineUI";
import { fetchUserTimeline } from "../../twitter-api";
import "../../../css/components/timeline/UserTimeline.scss";

export default class UserTimelineUI extends React.Component {

	static get buttonName() {
		return "Update User Timeline";
	}

	static get title() {
		return "User Timeline";
	}

	render() {
		return (
			<div className="user-timeline timeline-comp">
				<TimelineUI apiCall={fetchUserTimeline} buttonName={UserTimelineUI.buttonName} 
						title={UserTimelineUI.title} hideHandle={true}/>
			</div>
		);
	}
}