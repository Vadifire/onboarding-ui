import "../css/index.scss";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import HelloMessage from "./HelloMessage";
import TimelineUI from "./TimelineUI";

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(
	    <React.Fragment>
    		<div id="title">Lab for Cedric</div>
			<HelloMessage id="hello-react"></HelloMessage>
			<TimelineUI id="timeline-div"></TimelineUI>
		</React.Fragment>,
		document.getElementById("root")
	);
});