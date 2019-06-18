import React, { Component } from "react";
import HelloMessage from "./HelloMessage";
import TimelineUI from "./TimelineUI";
import "../../css/components/Application.scss";

export const classNames = {
	TITLE: "title"
};

export default class Application extends React.Component {
	render() {
		return (
			<div>
				<div className={classNames.TITLE}>Lab for Cedric</div>
				<HelloMessage message="hello react!" />
				<TimelineUI />
			</div>
		);
	}
}