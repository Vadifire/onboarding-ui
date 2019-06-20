import React, { Component } from "react";
import HelloMessage from "./HelloMessage";
import HomeTimelineUI from "./HomeTimelineUI";
import UserTimelineUI from "./UserTimelineUI";
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

//<HelloMessage message="hello react!" />