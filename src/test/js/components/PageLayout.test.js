import React from "react";
import { shallow } from "enzyme";
import PageLayout from "../../../main/js/components/PageLayout";

describe("TimelineUI", () => {
	const wrapper = shallow(<PageLayout/>);
	it("should contain div with 'title' id", () => {
		expect(wrapper.find("div#title").length).toEqual(1);
	});
	it("should contain HelloMessage", () => {
		expect(wrapper.find("HelloMessage").length).toEqual(1);
	});
	it("should contain TimelineUI", () => {
		expect(wrapper.find("TimelineUI").length).toEqual(1);
	});
});