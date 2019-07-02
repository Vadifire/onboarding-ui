import React from "react";
import { shallow } from "enzyme";
import HomeTimelineUI from "../../../../main/js/components/timeline/HomeTimelineUI";
import * as Api from "../../../../main/js/services/twitter-api";
import TimelineTestUtil from "./TimelineTestUtil";
import { expectOne } from "../../test-util";
import KeyCode from "keycode-js";

describe("HomeTimelineUI", () => {

	let timelineUI, util;

	beforeAll(() => {
		Api.fetchHomeTimeline = jest.fn();
		Api.fetchFilteredHomeTimeline = jest.fn();
		timelineUI = shallow(<HomeTimelineUI />, {disableLifecycleMethods: true});
		util = new TimelineTestUtil(timelineUI, "div.home-timeline");
	});

	afterEach(() => {
		Api.fetchHomeTimeline.mockClear();
		Api.fetchFilteredHomeTimeline.mockClear();
	});

	function getFilterButton() {
		return expectOne(timelineUI, "button.filter-timeline");
	}

	test("should render message: '" + HomeTimelineUI.apiErrorMessage + "'", done => {
		Api.fetchHomeTimeline.mockImplementation(callback => {
			callback(Error());
			util.expectErrorMessage(HomeTimelineUI.apiErrorMessage, Api.fetchHomeTimeline);
			done();
		});
		util.getUpdateButton().simulate("click");
	});

	test("should render message: '" + HomeTimelineUI.emptyTimelineMessage + "'", done => {
		Api.fetchHomeTimeline.mockImplementation(callback => {
			callback(null, []);
			util.expectErrorMessage(HomeTimelineUI.emptyTimelineMessage, Api.fetchHomeTimeline);
			done();
		});
		util.getUpdateButton().simulate("click");
	});

	test("should render tweets", done => {
		Api.fetchHomeTimeline.mockImplementation(callback => {
			callback(null, TimelineTestUtil.dummyTweets);
			util.expectTweets(TimelineTestUtil.dummyTweets, Api.fetchHomeTimeline);
			done();
		});
		util.getUpdateButton().simulate("click");
	});

	test("should render button with expected text", () => {
		const button = util.getUpdateButton();
		expect(button.text()).toEqual(HomeTimelineUI.updateButtonText);
	});

	/* Filtered Home Timeline Tests */
	test("should render filter button with expected text, disabled by default", () => {
		const button = expectOne(timelineUI, "button.filter-timeline");
		expect(button.text()).toEqual(HomeTimelineUI.filterButtonText);
		expect(button.prop("disabled")).toEqual(true);
	});

	test("should render filtered tweets", done => {
		Api.fetchFilteredHomeTimeline.mockImplementation(callback => {
			callback(null, TimelineTestUtil.dummyTweets);
			util.expectTweets(TimelineTestUtil.dummyTweets, Api.fetchFilteredHomeTimeline);
			expect(Api.fetchFilteredHomeTimeline).toHaveBeenCalledWith(callback, dummyFilter);
			done();
		}, dummyFilter);
		const dummyFilter = "some filter";
		const filterInput = expectOne(timelineUI, "input.filter-input");
		filterInput.simulate("change", {target: {value: dummyFilter}});
		filterInput.simulate("keyPress", {charCode: KeyCode.KEY_RETURN});
	});

	test("should render message: '" + HomeTimelineUI.noResultsForFilterMessage + "'", done => {
		Api.fetchFilteredHomeTimeline.mockImplementation(callback => {
			callback(null, []);
			util.expectErrorMessage(HomeTimelineUI.noResultsForFilterMessage, Api.fetchFilteredHomeTimeline);
			done();
		});
		getFilterButton().simulate("click");
	});

	test("should render error message: '" + HomeTimelineUI.apiErrorMessage + "'", done => {
		Api.fetchFilteredHomeTimeline.mockImplementation(callback => {
			callback(Error());
			util.expectErrorMessage(HomeTimelineUI.apiErrorMessage, Api.fetchFilteredHomeTimeline);
			done();
		});
		getFilterButton().simulate("click");
	});

});
