import React from "react";
import { shallow } from "enzyme";
import Application from "../../../main/js/components/Application";
import { expectOne } from "../test-util";


describe("TimelineUI", () => {

	let application;

	beforeAll(() => {
		application = shallow(<Application/>);
	});

	test("should contain a single title div", () => {
		expectOne(application, "div.title");
	});

	test("should contain a single HelloMessage component", () => {
		expectOne(application, "HelloMessage");
	});
	
	test("should contain a single TimelineUI component", () => {
		expectOne(application, "TimelineUI");
	});
});