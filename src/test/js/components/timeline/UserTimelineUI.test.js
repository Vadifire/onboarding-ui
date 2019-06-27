import React from "react";
import { shallow } from "enzyme";
import UserTimelineUI from "../../../../main/js/components/timeline/UserTimelineUI";
import * as Api from "../../../../main/js/twitter-api";
import TimelineTestUtil from "./TimelineTestUtil";

describe("UserTimelineUI", () => {

	let timelineUI, util;

	beforeAll(() => {
		Api.fetchUserTimeline = jest.fn();
		timelineUI = shallow(<UserTimelineUI api={Api}/>, {disableLifecycleMethods: true});
		util = new TimelineTestUtil(timelineUI, "div.user-timeline");
	});

	afterEach(() => {
		Api.fetchUserTimeline.mockClear();
	});

	test("should render header", () => {
		util.expectHeader(UserTimelineUI.timelineName);
	});

	test("should render button with expected text", () => {
		const button = util.getUpdateButton();
		expect(button.text()).toEqual(UserTimelineUI.updateButtonText);
	});

	test("should render message: '" + UserTimelineUI.apiErrorMessage + "'", done => {
		Api.fetchUserTimeline.mockImplementation(callback => {
			callback(Error());
			util.expectErrorMessage(UserTimelineUI.apiErrorMessage, Api.fetchUserTimeline);
			done();
		});
		util.getUpdateButton().simulate("click");
	});

	test("should render message in no API case: '" + UserTimelineUI.apiErrorMessage + "'", () => {
		const noApiTimeline = shallow(<UserTimelineUI/>, {disableLifecycleMethods: true});
		const noApiUtil = new TimelineTestUtil(noApiTimeline, "div.user-timeline");
		noApiUtil.getUpdateButton().simulate("click");
		noApiUtil.expectErrorMessage(UserTimelineUI.apiErrorMessage);
	});

	test("should render message: '" + UserTimelineUI.emptyTimelineMessage + "'", done => {
		Api.fetchUserTimeline.mockImplementation(callback => {
			callback(null, []);
			util.expectErrorMessage(UserTimelineUI.emptyTimelineMessage, Api.fetchUserTimeline);
			done();
		});
		util.getUpdateButton().simulate("click");
	});

	test("should render tweets", done => {
		Api.fetchUserTimeline.mockImplementation(callback => {
			callback(null, TimelineTestUtil.dummyTweets);
			util.expectTweets(TimelineTestUtil.dummyTweets, Api.fetchUserTimeline, true);
			done();
		});
		util.getUpdateButton().simulate("click");
	});

});
