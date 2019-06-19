import React from "react";
import { shallow } from "enzyme";
import TimelineUI from "../../../main/js/components/TimelineUI";
import { expectOne } from "../test-util";
import * as API from "../../../main/js/twitter-api";

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

	afterEach(() => {
		expect(API.fetchHomeTimeline).toHaveBeenCalledTimes(1);
		API.fetchHomeTimeline.mockReset();
	});

	// Test API Error Case
	test("should render button and error message: " + TimelineUI.API_ERROR_MESSAGE, (done) => {

		const rejectedPromise = Promise.reject();
		API.fetchHomeTimeline = jest.fn(() => rejectedPromise);
		const wrapper = shallow(<TimelineUI />);

		rejectedPromise.catch(() => {
			expectErrorMessage(wrapper, TimelineUI.API_ERROR_MESSAGE);
			done();
		});

	});

	// Test Empty Tweets Case
	test("should render button and error message: " + TimelineUI.EMPTY_TIMELINE_MESSAGE, (done) => {

		const emptyPromise = Promise.resolve([]);
		API.fetchHomeTimeline = jest.fn(() => emptyPromise);
		const wrapper = shallow(<TimelineUI />);

		emptyPromise.then(() => {
			expectErrorMessage(wrapper, TimelineUI.EMPTY_TIMELINE_MESSAGE);
			done();
		});
	});

	// Test Non-Empty Tweets Case
	test("should render button and tweets", (done) => {

		const promisedTweets = Promise.resolve(dummyTweets);
		API.fetchHomeTimeline = jest.fn(() => promisedTweets);
		const wrapper = shallow(<TimelineUI />);

		promisedTweets.then(() => {
			expectTweets(wrapper, dummyTweets);
			done();
		});
	});

	// Simulate button click
	test("should render updated tweets on button click" , (done) => {
		const emptyPromise = Promise.resolve([]);
		API.fetchHomeTimeline = jest.fn(() => emptyPromise);
		const wrapper = shallow(<TimelineUI />);

		emptyPromise.then(() => {
			expectErrorMessage(wrapper, TimelineUI.EMPTY_TIMELINE_MESSAGE);

			const promisedTweets = Promise.resolve(dummyTweets);
			API.fetchHomeTimeline = jest.fn(() => promisedTweets);
			const button = expectOne(wrapper, "div.timeline-div button.update-timeline");
			button.simulate("click");

			promisedTweets.then(() => {
				expectTweets(wrapper, dummyTweets);
				done();
			});
		});
	});

});
