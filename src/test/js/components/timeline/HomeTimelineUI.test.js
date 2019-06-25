import React from "react";
import { shallow } from "enzyme";
import HomeTimelineUI from "../../../../main/js/components/timeline/HomeTimelineUI";
import * as Api from "../../../../main/js/twitter-api";
import TimelineTestUtil from "./TimelineTestUtil";

describe("HomeTimelineUI", () => {

	let timelineUI, util;

	beforeAll(() => {
		Api.fetchHomeTimeline = jest.fn();
		timelineUI = shallow(<HomeTimelineUI />, {disableLifecycleMethods: true});
		util = new TimelineTestUtil(timelineUI, "div.home-timeline");
	});

	afterEach(() => {
		Api.fetchHomeTimeline.mockClear();
	});

	// Test Api Error Case
	test("should render error message: '" + HomeTimelineUI.apiErrorMessage + "'", done => {

		Api.fetchHomeTimeline.mockImplementation(callback => {
			callback(Error());
			util.expectErrorMessage(HomeTimelineUI.apiErrorMessage, Api.fetchHomeTimeline);
			done();
		});
		timelineUI.instance().updateTimeline();
		
	});

	// Test Empty Tweets Case
	test("should render error message: '" + HomeTimelineUI.emptyTimelineMessage + "'", done => {

		Api.fetchHomeTimeline.mockImplementation(callback => {
			callback(null, []);
			util.expectErrorMessage(HomeTimelineUI.emptyTimelineMessage, Api.fetchHomeTimeline);
			done();
		});
		timelineUI.instance().updateTimeline();
	});


	// Test Non-Empty Tweets Case
	test("should render tweets", done => {

		Api.fetchHomeTimeline.mockImplementation(callback => {
			callback(null, TimelineTestUtil.dummyTweets);
			util.expectTweets(TimelineTestUtil.dummyTweets, Api.fetchHomeTimeline);
			done();
		});
		timelineUI.instance().updateTimeline();
	});

	// Test rendering of button
	test("should render button", () => {
		util.expectButton(HomeTimelineUI.buttonText);
	});

	// Test rendering of header
	test("should render header", () => {
		util.expectHeader(HomeTimelineUI.timelineName);
	});

});
