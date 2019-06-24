import React from "react";
import { shallow } from "enzyme";
import HomeTimelineUI from "../../../../main/js/components/timeline/HomeTimelineUI";
import { expectOne } from "../../test-util";
import * as Api from "../../../../main/js/twitter-api";

describe("HomeTimelineUI", () => {

	test("should contain TimelineUI with correct props", () => {
		const userTimelineUI = shallow(<HomeTimelineUI/>);
		const timelineUI = expectOne(userTimelineUI, "TimelineUI");

		// TODO: consider constants
		expect(timelineUI.prop("apiCall")).toEqual(Api.fetchHomeTimeline);
		expect(timelineUI.prop("buttonName")).toEqual(HomeTimelineUI.buttonName);
		expect(timelineUI.prop("hideHandle")).toBeFalsy();
	});
});