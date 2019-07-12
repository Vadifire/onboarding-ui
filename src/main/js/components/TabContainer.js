import React from "react";
import { Tabs, Tab } from 'react-bootstrap-tabs';

import HomeTimelineUI from "./timeline/HomeTimelineUI";
import UserTimelineUI from "./timeline/UserTimelineUI";
import PostTweetUI from "./PostTweetUI";

import "../../css/components/TabContainer.scss";

export default class TabContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			selectedTab: 0
		};
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(index) {
		this.setState({selectedTab: index});
	}

	render() {
		return (
			<Tabs onSelect={this.onSelect} selected={this.state.selectedTab}>
				<Tab label="Home Timeline">
					<HomeTimelineUI />
				</Tab>
				<Tab label="User Timeline">
					<UserTimelineUI openReplyFunction={this.props.openReplyFunction}/>
				</Tab>
				<Tab label="Post Tweet">
					<PostTweetUI />
				</Tab>
			</Tabs>
		);
	}
}