import React, { Component } from "react";
import HelloMessage from "./HelloMessage";
import TimelineUI from "./TimelineUI";
import css from "../../css/components/Application.scss";

export default class Application extends React.Component {
	render() {
		return (
			<div>
				<div className="title">Lab for Cedric</div>
				<HelloMessage message="hello react!" />
				<TimelineUI />
			</div>
		);
	}
}