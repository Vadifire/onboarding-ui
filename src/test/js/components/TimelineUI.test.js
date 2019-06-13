import React from "react";
import { shallow } from "enzyme";
import TimelineUI from "../../../main/js/components/TimelineUI";

jest.mock("../../../main/js/twitter-api");
const mockedAPI = require("../../../main/js/twitter-api");

describe("TimelineUI", () => {

	/* Test Error Case */	
	test("should contain div#timeline-div as top level element. " + 
			"That div should then contain button#update-timeline and div#error-div with error message", () => {

		const dummyErrorMsg = "error";
		mockedAPI.__setResponse({
			tweets: null,
			error: dummyErrorMsg
		});

		const timelineDiv = shallow(<TimelineUI/>).find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
		expect(timelineDiv.find("div#error-div").length).toEqual(1);
		expect(timelineDiv.find("div#error-div").at(0).text()).toEqual(dummyErrorMsg);
	});

	/* Test Tweets Case */	
	test("should contain div#timeline-div as top level element. " + 
			"That div should then contain button#update-timeline and div#tweets", () => {

		const dummyTweets = [
			{url: "url1"},
			{url: "url2"}
		];
		mockedAPI.__setResponse({
			tweets: dummyTweets,
			error: null
		});

		const timelineDiv = shallow(<TimelineUI/>).find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
		expect(timelineDiv.find("div#tweets").length).toEqual(1);
	});

});