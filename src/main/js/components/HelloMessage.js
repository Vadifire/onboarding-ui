import React, { Component } from "react";
import "../../css/components/HelloMessage.scss";

export const classNames = {
	HELLO_MESSAGE: "hello-message"
};

export default class HelloMessage extends React.Component {

	render() {
		return (
			<div className={classNames.HELLO_MESSAGE}>
				{this.props.message}
			</div>
		);
	}
}