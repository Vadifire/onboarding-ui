import React from "react";
import { shallow } from "enzyme";
import TimelineUI from "../../../main/js/components/TimelineUI";

jest.mock("../../../main/js/twitter-api");

const mockedAPI = require("../../../main/js/twitter-api");

describe("TimelineUI", () => {

	// Test Error Case
	test("should contain div#timeline-div as top level element. " + 
			"That div should then contain button#update-timeline and div#error-div with error message", 
			async (done) => {

		mockedAPI.__setResponse(Promise.reject());

		const wrapper = shallow(<TimelineUI />);

		setImmediate(() => { // await componentDidMount() doesn't work... Promise.reject() doesn't resolve in time? 
			const timelineDiv = wrapper.find("div#timeline-div");
			expect(timelineDiv.length).toEqual(1);
			expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
			expect(timelineDiv.find("div#error-div").length).toEqual(1);
			expect(timelineDiv.find("div#error-div").at(0).text())
					.toEqual("Failed to fetch tweets from home timeline. Please try again later.");
			done();
		});

	});

	// Test Non-Empty Tweets Case
	test("should contain div#timeline-div as top level element. " + 
			"That div should then contain button#update-timeline and div#tweets", async () => {

		const dummyTweets = [
			{
				message: "some message",
				user: {
					name: "george",
					profileImageUrl: "www.twitter.com/george.png",
					twitterHandle: "the_real_george"
				},
				createdAt: 1560440907000,
				url: "twitter.com/filler"
			},
			{
				message: "another message",
				createdAt: 1560440901000,
				url: "twitter.com/a_url"
			}
		];
		mockedAPI.__setResponse(dummyTweets);

		const wrapper = shallow(<TimelineUI fetchTimeline={mockedAPI.fetchHomeTimeline}/>);
		await wrapper.instance().componentDidMount(); // Wait until timeline is fetched
		dummyTweets.forEach(tweet => { // Convert tweets for comparison
			tweet.createdAt = new Date(tweet.createdAt).toLocaleString("en-us", {month: "short", day: "numeric"});
			if (!tweet.user) {
				tweet.user = {name: "Unknown User"};
			}
		});

		const timelineDiv = wrapper.find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
		const tweets = timelineDiv.find("div#tweets");
		expect(tweets.length).toEqual(1);

		const rows = tweets.find("div.row");
		expect(rows.length).toEqual(dummyTweets.length);
		rows.map((row, index) => {
			const tweets = row.find("TweetBlock");
			expect(tweets.length).toEqual(1);
			expect(tweets.at(0).prop("tweet")).toEqual(dummyTweets[index]);
		});
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

/*
	// Simulate button click
	test("should update tweets on button click" , async () => {

		mockedAPI.__setResponse([{url: "old url"}]);

		const wrapper = shallow(<TimelineUI fetchTimeline={mockedAPI.fetchHomeTimeline}/>);
		await wrapper.instance().componentDidMount(); // Wait until timeline is fetched

		const timelineDiv = wrapper.find("div#timeline-div");

		const button = timelineDiv.find("button#update-timeline").at(0);
		const newTweets = [{url: "new url"}];
		button.simulate("click");

		setImmediate(() => {
			const tweets = timelineDiv.find("div#tweets div.row TweetBlock");
			expect(tweets.prop("tweet")).toEqual(newTweets[0]);
		});
	});*/

});