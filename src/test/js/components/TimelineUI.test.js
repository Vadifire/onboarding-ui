import React from "react";
import { shallow } from "enzyme";
import TimelineUI from "../../../main/js/components/TimelineUI";

jest.mock("../../../main/js/twitter-api");

describe("TimelineUI", () => {
	const dummyErrorMsg = "error";
	const mockedAPI = require("../../../main/js/twitter-api");
	mockedAPI.__setResponse({
		tweets: null,
		error: dummyErrorMsg
	});

	const wrapper = shallow(<TimelineUI/>);

	let timelineDiv;

	it("should contain div with 'timeline-div' id", () => {
		timelineDiv = wrapper.find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
	});
	it("should contain a buton with id 'update-timeline' within timeline-div", () => {
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
	});
	it("should display error message in div with 'error-div' id", () => {
		expect(timelineDiv.find("div#error-div").length).toEqual(1);
	});
	it(("error div should contain text: " + dummyErrorMsg), () => {
		expect(timelineDiv.find("div#error-div").at(0).text()).toEqual(dummyErrorMsg);
	});

	mockedAPI.__setResponse({
		tweets: [],
		error: null
	});

});