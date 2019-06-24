import React from "react";
import { shallow } from "enzyme";
import UserTimelineUI from "../../../../main/js/components/timeline/UserTimelineUI";
import { expectOne } from "../../test-util";
import * as Api from "../../../../main/js/twitter-api";

describe("UserTimelineUI", () => {

	test("should contain TimelineUI with correct props", () => { //TODO: correct ?
		const userTimelineUI = shallow(<UserTimelineUI/>);
		const timelineUI = expectOne(userTimelineUI, "TimelineUI");

		// TODO: consider constants
		expect(timelineUI.prop("apiCall")).toEqual(Api.fetchUserTimeline);
		expect(timelineUI.prop("buttonName")).toEqual(UserTimelineUI.buttonName);
		expect(timelineUI.prop("hideHandle")).toBeTruthy();
		expect(timelineUI.prop("title")).toEqual(UserTimelineUI.title);
	});

});