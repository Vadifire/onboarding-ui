import React from "react";
import TabContainer from "./TabContainer";
import "../../css/components/Application.scss";

export default class Application extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className="title">Lab for Cedric</div>
				<TabContainer />
			</React.Fragment>
		);
	}
}