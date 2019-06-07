import "../css/index.scss";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import HelloMessage from "./HelloMessage";
import TimelineContainer from "./TimelineContainer";

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(
	    <React.Fragment>
    		<div id="title">Lab for Cedric</div>
			<HelloMessage id="hello-react"></HelloMessage>
			<TimelineContainer id="timeline-div"></TimelineContainer>
		</React.Fragment>,
		document.getElementById("root")
	);
});