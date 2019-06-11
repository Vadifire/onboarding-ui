import React, { Component } from "react";
import HelloMessage from "./HelloMessage";
import TimelineUI from "./TimelineUI";

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<div id="title">Lab for Cedric</div>
				<HelloMessage id="hello-message" message="hello react!"></HelloMessage>
				<TimelineUI id="timeline-div"></TimelineUI>
			</div>
		);
	}
}