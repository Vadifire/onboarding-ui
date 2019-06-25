import React from "react";
import { shallow } from "enzyme";
import MainTimelineElement from "../../../../main/js/components/timeline/MainTimelineElement";
import TweetBlock from "../../../../main/js/components/timeline/TweetBlock";
import { expectOne } from "../../test-util";
import TimelineTestUtil from "./TimelineTestUtil";

describe("MainTimelineElem", () => {

	test("should display TweetBlock", () => {
		const timelineElem = shallow(<MainTimelineElement tweets={TimelineTestUtil.dummyTweets}/>);
		const tweetBlocks = timelineElem.find("TweetBlock");
		tweetBlocks.forEach((tweetBlock, index) => {
			expect(tweetBlock.prop("tweet")).toEqual(TimelineTestUtil.dummyTweets[index]);
		});
	});


	test("should display ErrorDiv", () => {
		const dummyMessage = "error message";
		const timelineElem = shallow(<MainTimelineElement message={dummyMessage}/>);
		const errorDiv = expectOne(timelineElem, "div.error-div");
		expect(errorDiv.text()).toEqual(dummyMessage);
	});
});
