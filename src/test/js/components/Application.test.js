import React from "react";
import { shallow } from "enzyme";
import Application from "../../../main/js/components/Application";
import { expectOne } from "../test-util";


describe("Application", () => {

	let application;

	beforeAll(() => {
		application = shallow(<Application/>);
	});

	test("should contain a single title div", () => {
		expectOne(application, "div.title");
	});
	
	test("should contain div with UserTimelineUI and HomeTimelineUI components", () => {
		const timelines = expectOne(application, "div.timelines");
		const userTimeline = expectOne(timelines, "UserTimelineUI");
		const homeTimeline = expectOne(timelines, "HomeTimelineUI");
	});
});