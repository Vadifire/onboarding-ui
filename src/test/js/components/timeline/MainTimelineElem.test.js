import React from "react";
import { shallow } from "enzyme";
import MainTimelineElement from "../../../../main/js/components/timeline/MainTimelineElement";
import TweetBlock from "../../../../main/js/components/timeline/TweetBlock";
import { expectOne } from "../../test-util";
import TimelineTestUtil from "./TimelineTestUtil";

describe("MainTimelineElem", () => {

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
		const errorDiv = expectOne(timelineElem, "div.timeline-message");
		expect(errorDiv.text()).toEqual(dummyMessage);
	});

	test("should display loading message if no props defined", () => {
		const timelineElem = shallow(<MainTimelineElement/>);
		const errorDiv = expectOne(timelineElem, "div.timeline-message");
		expect(errorDiv.text()).toEqual(MainTimelineElement.loadingMessage);
	});

	test("should display error message if issue with tweets prop", () => {
		const timelineElem = shallow(<MainTimelineElement tweets={"not a list of tweets"}/>);
		const errorDiv = expectOne(timelineElem, "div.timeline-message");
		expect(errorDiv.text()).toEqual(MainTimelineElement.errorMessage);
	});

});
