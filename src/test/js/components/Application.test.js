import React from "react";
import { shallow } from "enzyme";
import Application from "../../../main/js/components/Application";

describe("TimelineUI", () => {
	const wrapper = shallow(<Application/>);

	test("should contain a single div with 'title' id", () => {
		expect(wrapper.find("div#title").length).toEqual(1);
	});

	test("should contain a single HelloMessage component", () => {
		expect(wrapper.find("HelloMessage").length).toEqual(1);
	});
	
	test("should contain a single TimelineUI component", () => {
		expect(wrapper.find("TimelineUI").length).toEqual(1);
	});
});