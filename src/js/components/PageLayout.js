import React, { Component } from "react";
import HelloMessage from "./HelloMessage";
import TweetsContainer from "./TweetsContainer";
import "../../css/components/PageLayout.scss";

// Contains Title, Hello Message, and Timeline UI
export default class PageLayout extends React.Component {
	render() {
		return (
			<div>
				<div id="title">Lab for Cedric</div>
				<HelloMessage message="hello react!" />
				<TweetsContainer />
			</div>
		);
	}
}