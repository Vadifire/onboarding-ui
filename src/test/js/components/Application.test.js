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
	
	// TODO: figure out structure
	test("should contain a single UserTimelineUI component", () => {
		expectOne(application, "UserTimelineUI");
	});
	// TODO: figure out structure
	test("should contain a single HomeTimelineUI component", () => {
		expectOne(application, "HomeTimelineUI");
	});
});