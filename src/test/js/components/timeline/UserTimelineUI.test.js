import React from "react";
import { shallow } from "enzyme";
import UserTimelineUI from "../../../../main/js/components/timeline/UserTimelineUI";
import * as Api from "../../../../main/js/twitter-api";
import TimelineTestUtil from "./TimelineTestUtil";

describe("UserTimelineUI", () => {

	let timelineUI, util;

	beforeAll(() => {
		Api.fetchUserTimeline = jest.fn();
		timelineUI = shallow(<UserTimelineUI />, {disableLifecycleMethods: true});
		util = new TimelineTestUtil(timelineUI, "div.user-timeline");
	});

	afterEach(() => {
		Api.fetchUserTimeline.mockClear();
	});

	// Test Api Error Case
	test("should render error message: '" + UserTimelineUI.apiErrorMessage + "'", done => {

		Api.fetchUserTimeline.mockImplementation(callback => {
			callback(Error());
			util.expectErrorMessage(UserTimelineUI.apiErrorMessage, Api.fetchUserTimeline);
			done();
		});
		timelineUI.instance().updateTimeline();
		
	});

	// Test Empty Tweets Case
	test("should render error message: '" + UserTimelineUI.emptyTimelineMessage + "'", done => {

		Api.fetchUserTimeline.mockImplementation(callback => {
			callback(null, []);
			util.expectErrorMessage(UserTimelineUI.emptyTimelineMessage, Api.fetchUserTimeline);
			done();
		});
		timelineUI.instance().updateTimeline();
	});


	// Test Non-Empty Tweets Case
	test("should render tweets", done => {

		Api.fetchUserTimeline.mockImplementation(callback => {
			callback(null, TimelineTestUtil.dummyTweets);
			util.expectTweets(TimelineTestUtil.dummyTweets, true, Api.fetchUserTimeline);
			done();
		});
		timelineUI.instance().updateTimeline();
	});

	// Test rendering of button
	test("should render button", () => {
		util.expectButton(UserTimelineUI.buttonText);
	});

	// Test rendering of header
	test("should render header", () => {
		util.expectHeader(UserTimelineUI.timelineName);
	});

});
