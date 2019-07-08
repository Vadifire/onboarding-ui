import React from "react";
import { shallow } from "enzyme";
import TabContainer from "../../../main/js/components/TabContainer";
import { expectOne } from "../test-util";

describe("TabContainer", () => {

	let tabs;

	beforeAll(() => {
		const tabContainer = shallow(<TabContainer/>);
		tabs = tabContainer.find("TabComponent");
	});

	test("should contain Tab with Home Timeline", () => {
		expectOne(tabs, "HomeTimelineUI");
	});

	test("should contain Tab with User Timeline", () => {
		expectOne(tabs, "UserTimelineUI");
	});

	test("should contain Tab with Post Tweet Feature", () => {
		expectOne(tabs, "PostTweetUI");
	});
});