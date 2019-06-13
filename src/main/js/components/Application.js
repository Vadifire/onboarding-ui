import React, { Component } from "react";
import HelloMessage from "./HelloMessage";
import TimelineUI from "./TimelineUI";
import {fetchHomeTimeline} from "../twitter-api.js";
import "../../css/components/Application.scss";

// Contains Title, Hello Message, and Timeline UI
export default class Application extends React.Component {
	render() {
		return (
			<div>
				<div id="title">Lab for Cedric</div>
				<HelloMessage message="hello react!" />
				<TimelineUI fetchTimeline={fetchHomeTimeline}/>
			</div>
		);
	}
}