import React from "react";
import {shallow} from "enzyme";
import TimelineUI from "../../../main/js/components/TimelineUI";
import {expectOne} from "../test-util";

// Mock out API calls
jest.mock("../../../main/js/twitter-api");
const mockedAPI = require("../../../main/js/twitter-api");

const dummyTweets = 
	[{
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
	}];

// Used in error message test cases
function expectErrorMessage(wrapper, message) {
	const timelineDiv = expectOne(wrapper, "div.timeline-div");
	expectOne(timelineDiv, "button.update-timeline");
	const errorDiv = expectOne(timelineDiv, "div.error-div");
	expect(errorDiv.text()).toEqual(message);
}

// Used in valid response test cases
function expectTweets(wrapper, response) {
	const timelineDiv = expectOne(wrapper, "div.timeline-div");
	expectOne(timelineDiv, "button.update-timeline");
	const tweetsDiv = expectOne(timelineDiv, "div.tweets");

	const rows = tweetsDiv.find("div.row");


	const tweets = TimelineUI.extractTweets(response);
	rows.forEach((row, index) => {
		const tweetBlock = expectOne(row, "TweetBlock");
		expect(tweetBlock.prop("tweet")).toEqual(tweets[index]);
	});
}


describe("TimelineUI", () => {

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
