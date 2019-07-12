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
	
	test("should contain TabContainer", () => {
		expectOne(application, "TabContainer");
	});

	test("should contain ReplyToTweetUI", () => {
		expectOne(application, "ReplyToTweetUI");
	});
});