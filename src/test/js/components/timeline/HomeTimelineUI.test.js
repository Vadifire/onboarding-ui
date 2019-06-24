import React from "react";
import { shallow } from "enzyme";
import HomeTimelineUI from "../../../../main/js/components/timeline/HomeTimelineUI";
import { expectOne } from "../../test-util";
import * as Api from "../../../../main/js/twitter-api";

describe("HomeTimelineUI", () => {

	test("should contain TimelineUI with correct props", () => {
		const homeTimelineUI = shallow(<HomeTimelineUI/>);
		const timelineUI = expectOne(homeTimelineUI, "TimelineUI");

		// TODO: consider constants
		expect(timelineUI.prop("apiCall")).toEqual(Api.fetchHomeTimeline);
		expect(timelineUI.prop("buttonName")).toEqual(HomeTimelineUI.buttonName);
		expect(timelineUI.prop("hideHandle")).toBeFalsy();
		expect(timelineUI.prop("title")).toEqual(HomeTimelineUI.title);
		expect(homeTimelineUI.hasClass("timeline-comp")).toBe(true);
	});
});