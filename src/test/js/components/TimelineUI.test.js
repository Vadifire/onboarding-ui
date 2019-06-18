import React from "react";
import {shallow} from "enzyme";
import TimelineUI, {errorMessages, DEFAULT_NAME, extractTweets} from "../../../main/js/components/TimelineUI";
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


describe("TimelineUI", () => {

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

		const tweets = extractTweets(response);
		rows.forEach((row, index) => {
			const tweetBlock = expectOne(row, "TweetBlock");
			expect(tweetBlock.prop("tweet")).toEqual(tweets[index]);
		});
	}

	// Test API Error Case
	test("should render button and error message: " + errorMessages.API_ERROR_MESSAGE, (done) => {

		mockedAPI.__setResponse(null); // TODO: make this make more sense...
		const wrapper = shallow(<TimelineUI />);

		expectErrorMessage(wrapper, errorMessages.API_ERROR_MESSAGE);
		done();

	});

	// Test Empty Tweets Case
	test("should render button and error message: " + errorMessages.EMPTY_TIMELINE_MESSAGE, (done) => {

		mockedAPI.__setResponse([]);
		const wrapper = shallow(<TimelineUI />);

		expectErrorMessage(wrapper, errorMessages.EMPTY_TIMELINE_MESSAGE);
		done();
	});

	// Test Non-Empty Tweets Case
	test("should render button and tweets", (done) => {

		mockedAPI.__setResponse(dummyTweets);
		const wrapper = shallow(<TimelineUI />);

		expectTweets(wrapper, dummyTweets);
		done();
	});

	// Simulate button click
	test("should render updated tweets on button click" , (done) => {
		mockedAPI.__setResponse([]); // Start with blank tweets
		const wrapper = shallow(<TimelineUI />);

		expectErrorMessage(wrapper, errorMessages.EMPTY_TIMELINE_MESSAGE);

		mockedAPI.__setResponse(dummyTweets); // Define updated tweets retrieved on button click
		const button = expectOne(wrapper, "div.timeline-div button.update-timeline");
		button.simulate("click");

		expectTweets(wrapper, dummyTweets);
		done();
	});

});
