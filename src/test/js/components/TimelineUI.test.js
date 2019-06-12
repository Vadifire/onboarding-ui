import React from "react";
import { shallow } from "enzyme";
import TimelineUI from "../../../main/js/components/TimelineUI";

jest.mock("../../../main/js/twitter-api");

describe("TimelineUI", () => {

	let timelineDiv;

	/* Test Error Case */	
	const dummyErrorMsg = "error";
	const mockedAPI = require("../../../main/js/twitter-api");
	mockedAPI.__setResponse({
		tweets: null,
		error: dummyErrorMsg
	});

	const errorWrapper = shallow(<TimelineUI/>);
	test("should contain div with 'timeline-div' id", () => {
		timelineDiv = errorWrapper.find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
	});
	test("should contain a buton with id 'update-timeline' within timeline-div", () => {
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
	});
	test("should display error message in div with 'error-div' id", () => {
		expect(timelineDiv.find("div#error-div").length).toEqual(1);
	});
	test(("error div should contain text: " + dummyErrorMsg), () => {
		expect(timelineDiv.find("div#error-div").at(0).text()).toEqual(dummyErrorMsg);
	});

	/* Test Tweets Case */	
	const dummyTweets = [
		{url: "url1"},
		{url: "url2"}
	];
	mockedAPI.__setResponse({
		tweets: dummyTweets,
		error: null
	});
	const tweetsWrapper = shallow(<TimelineUI/>);
	test("should contain div with 'timeline-div' id", () => {
		timelineDiv = tweetsWrapper.find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
	});
	test("should contain a buton with id 'update-timeline' within timeline-div", () => {
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
	});
	test(("should display tweets in div with 'tweets' id"), () => {
		expect(timelineDiv.find("div#tweets").length).toEqual(1);
	});

});