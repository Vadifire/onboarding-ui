import React from "react";
import { shallow } from "enzyme";
import Application, {classNames} from "../../../main/js/components/Application";
import {expectOne} from "../test-util";

describe("TimelineUI", () => {
	const wrapper = shallow(<Application/>);

	test("should contain a single div with 'title' id", () => {
		expectOne(wrapper, "div."+classNames.TITLE);
	});

	test("should contain a single HelloMessage component", () => {
		expectOne(wrapper, "HelloMessage");
	});
	
	test("should contain a single TimelineUI component", () => {
		expectOne(wrapper, "TimelineUI");
	});
});