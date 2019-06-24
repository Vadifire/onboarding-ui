import React, { Component } from "react";
import HomeTimelineUI from "./timeline/HomeTimelineUI";
import UserTimelineUI from "./timeline/UserTimelineUI";
import "../../css/components/Application.scss";

export default class Application extends React.Component {
	render() {
		return (
			<div>
				<div className="title">Lab for Cedric</div>
				<div className="outer">
					<div className="inner">
						<HomeTimelineUI />
						<UserTimelineUI />
					</div>
				</div>
			</div>
		);
	}
}