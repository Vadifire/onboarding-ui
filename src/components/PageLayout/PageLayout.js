import React, { Component } from "react";
import HelloMessage from "../HelloMessage/HelloMessage";
import TimelineUI from "../TimelineUI/TimelineUI";
import "./PageLayout.scss";

// Contains Title, Hello Message, and Timeline UI
export default class PageLayout extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div id="title">Lab for Cedric</div>
				<HelloMessage message="hello react!" />
				<TimelineUI />
			</React.Fragment>
		);
	}
}