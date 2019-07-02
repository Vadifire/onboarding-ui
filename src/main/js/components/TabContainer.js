import React from "react";
import {Tabs, Tab} from 'react-bootstrap-tabs';
import HomeTimelineUI from "./timeline/HomeTimelineUI";
import UserTimelineUI from "./timeline/UserTimelineUI";
import PostTweetUI from "./PostTweetUI";
import "../../css/components/TabContainer.scss";

export default class TabContainer extends React.Component {

	render() {
		return (
			<Tabs>
				<Tab label="Home Timeline">
					<HomeTimelineUI />
				</Tab>
				<Tab label="User Timeline">
					<UserTimelineUI />
				</Tab>
				<Tab label="Post Tweet">
					<PostTweetUI />
				</Tab>
			</Tabs>
		);
	}
}