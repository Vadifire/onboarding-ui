import React from "react";
import { shallow } from "enzyme";
import Application from "../../../main/js/components/Application";
import { expectOne } from "../test-util";

const wrapper = shallow(<Application/>);

describe("TimelineUI", () => {

	test("should contain a single title div", () => {
		expectOne(wrapper, "div.title");
	});

	test("should contain a single HelloMessage component", () => {
		expectOne(wrapper, "HelloMessage");
	});
	
	test("should contain a single TimelineUI component", () => {
		expectOne(wrapper, "TimelineUI");
	});
});