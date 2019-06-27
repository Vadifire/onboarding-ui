import React, { Component } from "react";
import HomeTimelineUI from "./timeline/HomeTimelineUI";
import UserTimelineUI from "./timeline/UserTimelineUI";
import "../../css/components/Application.scss";

export default class Application extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className="title">Lab for Cedric</div>
				<div className="timelines">
					<HomeTimelineUI/>
					<UserTimelineUI/>
				</div>
			</React.Fragment>
		);
	}
}