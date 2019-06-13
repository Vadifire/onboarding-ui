import React from "react";
import { shallow } from "enzyme";
import TimelineUI from "../../../main/js/components/TimelineUI";

jest.mock("../../../main/js/twitter-api");

const mockedAPI = require("../../../main/js/twitter-api");

describe("TimelineUI", () => {

	// Test Error Case
	test("should contain div#timeline-div as top level element. " + 
			"That div should then contain button#update-timeline and div#error-div with error message", async () => {

		mockedAPI.__setResponse(Promise.reject());

		const wrapper = shallow(<TimelineUI fetchTimeline={mockedAPI.fetchHomeTimeline}/>);

		setImmediate(() => { // await componentDidMount() doesn't work... Promise.reject() doesn't resolve in time? 
			const timelineDiv = wrapper.find("div#timeline-div");
			expect(timelineDiv.length).toEqual(1);
			expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
			expect(timelineDiv.find("div#error-div").length).toEqual(1);
			expect(timelineDiv.find("div#error-div").at(0).text())
					.toEqual("Failed to fetch tweets from home timeline. Please try again later.");
		});

	});

	// Test Non-Empty Tweets Case
	test("should contain div#timeline-div as top level element. " + 
			"That div should then contain button#update-timeline and div#tweets", async () => {

		const dummyTweets = [
			{url: "url1"},
			{url: "url2"}
		];
		mockedAPI.__setResponse(dummyTweets);

		const wrapper = shallow(<TimelineUI fetchTimeline={mockedAPI.fetchHomeTimeline}/>);
		await wrapper.instance().componentDidMount(); // Wait until timeline is fetched

		const timelineDiv = wrapper.find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
		expect(timelineDiv.find("div#tweets").length).toEqual(1);
	});

	// Test Empty Tweets Case
	test("should contain div#timeline-div as top level element. " + 
			"That div should then contain button#update-timeline and div#error-div", async () => {

		mockedAPI.__setResponse([]);

		const wrapper = shallow(<TimelineUI fetchTimeline={mockedAPI.fetchHomeTimeline}/>);
		await wrapper.instance().componentDidMount(); // Wait until timeline is fetched

		const timelineDiv = wrapper.find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
		expect(timelineDiv.find("div#error-div").length).toEqual(1);
		expect(timelineDiv.find("div#error-div").at(0).text()).toEqual("Home timeline is empty.");
	});

});