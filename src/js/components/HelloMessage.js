import React, { Component } from "react";
import "../../css/components/HelloMessage.scss";

export default class HelloMessage extends React.Component {

	render() {
		return (
			<div id="hello-message">
				{this.props.message}
			</div>
		);
	}
}