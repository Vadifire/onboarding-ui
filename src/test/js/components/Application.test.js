import React from "react";
import { shallow } from "enzyme";
import Application from "../../../main/js/components/Application";
import { expectOne } from "../test-util";


describe("Application", () => {

	let application, dummyApi;

	beforeAll(() => {
		dummyApi = "Pretend I'm an API."
		application = shallow(<Application api={dummyApi}/>);
	});

	test("should contain a single title div", () => {
		expectOne(application, "div.title");
	});
	
	test("should contain div with UserTimelineUI and HomeTimelineUI components, passing API prop", () => {
		const timelines = expectOne(application, "div.timelines");
		const userTimeline = expectOne(timelines, "UserTimelineUI");
		expect(userTimeline.prop("api")).toEqual(dummyApi);
		const homeTimeline = expectOne(timelines, "HomeTimelineUI");
		expect(homeTimeline.prop("api")).toEqual(dummyApi);
	});
});