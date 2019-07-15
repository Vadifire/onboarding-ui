import React from "react";
import { shallow } from "enzyme";

import MainTimelineElement from "../../../../main/js/components/timeline/MainTimelineElement";
import TimelineTestUtil from "./TimelineTestUtil";
import { expectOne } from "../../test-util";

describe("MainTimelineElem", () => {

	function expectMessage(timelineElem, message) {
		const messageDiv = expectOne(timelineElem, "div.timeline-message");
		expect(messageDiv.text()).toEqual(message);
	}

	test("should display TweetBlocks", () => {
		const dummyHideHandle = true;
		const timelineElem = shallow(<MainTimelineElement tweets={TimelineTestUtil.dummyTweets}
				hideHandle={dummyHideHandle}/>);
		const tweetBlocks = timelineElem.find("TweetBlock");
		tweetBlocks.forEach((tweetBlock, index) => {
			expect(tweetBlock.prop("tweet")).toEqual(TimelineTestUtil.dummyTweets[index]);
			expect(tweetBlock.prop("hideHandle")).toEqual(dummyHideHandle);
		});
	});

	test("should display message from prop", () => {
		const dummyMessage = "error message";
		const timelineElem = shallow(<MainTimelineElement message={dummyMessage}/>);
		expectMessage(timelineElem, dummyMessage);
	});

	test("should display loading message if no props defined", () => {
		const timelineElem = shallow(<MainTimelineElement/>);
		expectMessage(timelineElem, MainTimelineElement.loadingMessage);
	});

	test("should display error message if issue with tweets prop", () => {
		const timelineElem = shallow(<MainTimelineElement tweets={"not a list of tweets"}/>);
		expectMessage(timelineElem, MainTimelineElement.errorMessage);
	});

});
