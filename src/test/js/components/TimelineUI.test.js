import React from "react";
import { shallow } from "enzyme";
import TimelineUI from "../../../main/js/components/TimelineUI";
import { expectOne } from "../test-util";
import * as API from "../../../main/js/twitter-api";

describe("TimelineUI", () => {

	let dummyTweets, timelineUI;

	function getTimelineDiv() {
		return expectOne(timelineUI, "div.timeline-div");
	}

	function expectButton() { // These elements never change
		const button = expectOne(getTimelineDiv(timelineUI), "button.update-timeline");
		expect(button.prop("onClick")).toEqual(timelineUI.instance().updateTimeline);
	}

	// Used in error message test cases
	function expectErrorMessage(message) {
		const timelineDiv = getTimelineDiv(timelineUI);
		const errorDiv = expectOne(getTimelineDiv(timelineUI), "div.error-div");
		expect(errorDiv.text()).toEqual(message);
		expect(API.fetchHomeTimeline).toHaveBeenCalledTimes(1);
	}

	// Used in valid response test cases
	function expectTweets(response) {
		const tweetsDiv = expectOne(getTimelineDiv(timelineUI), "div.tweets");
		const rows = tweetsDiv.find("div.row");
		const tweets = TimelineUI.extractTweets(response);
		rows.forEach((row, index) => {
			const tweetBlock = expectOne(row, "TweetBlock");
			expect(tweetBlock.prop("tweet")).toEqual(tweets[index]);
		});
		expect(API.fetchHomeTimeline).toHaveBeenCalledTimes(1);
	}

	beforeAll(() => {
		dummyTweets = [
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
	});

	beforeEach(() => {
		// Create new UI for each test case to prevent one test from affecting another
		timelineUI = shallow(<TimelineUI />, {disableLifecycleMethods: true});
	});

	// Test API Error Case
	test("should render button and error message: " + TimelineUI.API_ERROR_MESSAGE, () => {

		mockedAPI.__setResponse(null); // TODO: make this make more sense...
		const wrapper = shallow(<TimelineUI />);

		expectErrorMessage(wrapper, TimelineUI.API_ERROR_MESSAGE);		
	});

	// Test Empty Tweets Case
	test("should render button and error message: " + TimelineUI.EMPTY_TIMELINE_MESSAGE, () => {

		mockedAPI.__setResponse([]);
		const wrapper = shallow(<TimelineUI />);

		expectErrorMessage(wrapper, TimelineUI.EMPTY_TIMELINE_MESSAGE);
	});

	// Test Non-Empty Tweets Case
	test("should render button and tweets", () => {

		mockedAPI.__setResponse(dummyTweets);
		const wrapper = shallow(<TimelineUI />);

		expectTweets(wrapper, dummyTweets);
	});

	// Simulate button click
	test("should render updated tweets on button click" , () => {
		mockedAPI.__setResponse([]); // Start with blank tweets
		const wrapper = shallow(<TimelineUI />);

		expectErrorMessage(wrapper, TimelineUI.EMPTY_TIMELINE_MESSAGE);

		mockedAPI.__setResponse(dummyTweets); // Define updated tweets retrieved on button click
		const button = expectOne(wrapper, "div.timeline-div button.update-timeline");
		button.simulate("click");

		expectTweets(wrapper, dummyTweets);
	});

});
