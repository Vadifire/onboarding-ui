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

		const rejectedPromise = Promise.reject();
		mockedAPI.__setPromisedResponse(rejectedPromise); // Makes API call return Promise.reject()
		const wrapper = shallow(<TimelineUI />);

		rejectedPromise.then(() => {
			done.fail(Error("Promise should not resolve."));
		}).catch(() => {
			expectErrorMessage(wrapper, errorMessages.API_ERROR_MESSAGE);
			done();
		});

	});

	// Test Empty Tweets Case
	test("should render button and error message: " + errorMessages.EMPTY_TIMELINE_MESSAGE, (done) => {

		const emptyPromise = Promise.resolve([]);
		mockedAPI.__setPromisedResponse(emptyPromise);
		const wrapper = shallow(<TimelineUI />);

		emptyPromise.then(() => {
			expectErrorMessage(wrapper, errorMessages.EMPTY_TIMELINE_MESSAGE);
			done();
		});
	});

	// Test Non-Empty Tweets Case
	test("should render button and tweets", (done) => {

		const promisedTweets = Promise.resolve(dummyTweets);
		mockedAPI.__setPromisedResponse(promisedTweets);
		const wrapper = shallow(<TimelineUI />);

		promisedTweets.then(() => {
			expectTweets(wrapper, dummyTweets);
			done();
		});
	});

	// Simulate button click
	test("should render updated tweets on button click" , (done) => {
		const emptyPromise = Promise.resolve([]);
		mockedAPI.__setPromisedResponse(emptyPromise); // Start with blank tweets
		const wrapper = shallow(<TimelineUI />);

		emptyPromise.then(() => {
			expectErrorMessage(wrapper, errorMessages.EMPTY_TIMELINE_MESSAGE);

			const promisedTweets = Promise.resolve(dummyTweets);
			mockedAPI.__setPromisedResponse(promisedTweets); // Define updated tweets retrieved on button click
			const button = expectOne(wrapper, "div.timeline-div button.update-timeline");
			button.simulate("click");

			promisedTweets.then(() => {
				expectTweets(wrapper, dummyTweets);
				done();
			});
		});
	});

});
