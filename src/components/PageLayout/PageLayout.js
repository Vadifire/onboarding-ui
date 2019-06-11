import React, { Component } from "react";
import HelloMessage from "../HelloMessage/HelloMessage";
import TimelineUI from "../TimelineUI/TimelineUI";
import "./PageLayout.scss";

// Contains Title, Hello Message, and Timeline UI
export default class PageLayout extends React.Component {
	render() {
		return (
			<div>
				<div id="title">Lab for Cedric</div>
				<HelloMessage message="hello react!"></HelloMessage>
				<TimelineUI />
			</div>
		);
	}
}