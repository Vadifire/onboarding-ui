import React, { Component } from "react";

class HelloMessage extends React.Component {
	render() {
		return (
			<div id={this.props.id}>hello react!</div>
		);
	}
}

export default HelloMessage;