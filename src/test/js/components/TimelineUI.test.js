import React from "react";
import { shallow } from "enzyme";
import TimelineUI from "../../../main/js/components/TimelineUI";

jest.mock("../../../main/js/twitter-api");

const mockedAPI = require("../../../main/js/twitter-api");

describe("TimelineUI", () => {

	let dummyTweets, API_ERROR_MESSAGE, EMPTY_TIMELINE_MESSAGE;

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

		API_ERROR_MESSAGE = "Failed to fetch tweets from home timeline. Please try again later.";
		EMPTY_TIMELINE_MESSAGE = "Home timeline is empty.";
	});

	// Used in error message test cases
	function expectErrorMessage(wrapper, message) {
		const timelineDiv = wrapper.find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
		expect(timelineDiv.find("div#error-div").length).toEqual(1);
		expect(timelineDiv.find("div#error-div").at(0).text()).toEqual(message);
	}

	// Used in valid response test cases
	function expectTweets(wrapper, tweetsResponse) {
		const timelineDiv = wrapper.find("div#timeline-div");
		expect(timelineDiv.length).toEqual(1);
		expect(timelineDiv.find("button#update-timeline").length).toEqual(1);
		const tweets = timelineDiv.find("div#tweets");
		expect(tweets.length).toEqual(1);

		const rows = tweets.find("div.row");
		expect(rows.length).toEqual(tweetsResponse.length);
		rows.forEach((row, index) => {
			const tweets = row.find("TweetBlock");
			expect(tweets.length).toEqual(1);
			expect(tweets.at(0).prop("tweet")).toEqual(convTweet(tweetsResponse[index]));
		});
	}

	// Defines the expected (tweet object from API call) -> (tweet content used in rendering) conversion
	function convTweet(tweet) {
		tweet.createdAt = new Date(tweet.createdAt).toLocaleString("en-us", {month: "short", day: "numeric"});
		if (!tweet.user) {
			tweet.user = {name: "Unknown User"};
		}
		return tweet;
	}

	// Test API Error Case
	test("should render button and error message in API failure case", (done) => {

		const rejectedPromise = Promise.reject();
		mockedAPI.__setPromisedResponse(rejectedPromise); // Makes API call return Promise.reject()
		const wrapper = shallow(<TimelineUI />);

		rejectedPromise.then(() => {
			done.fail(Error("Promise should not resolve."));
		}).catch(() => {
			expectErrorMessage(wrapper, API_ERROR_MESSAGE);
			done();
		});

	});

	// Test Empty Tweets Case
	test("should contain div#timeline-div as top level element. " + 
			"That div should then contain button#update-timeline and div#error-div", (done) => {

		const emptyPromise = Promise.resolve([]);
		mockedAPI.__setPromisedResponse(emptyPromise);
		const wrapper = shallow(<TimelineUI />);

		emptyPromise.then(() => {
			expectErrorMessage(wrapper, EMPTY_TIMELINE_MESSAGE);
			done();
		});
	});


	// Test Non-Empty Tweets Case
	test("should contain div#timeline-div as top level element. " + 
			"That div should then contain button#update-timeline and div#tweets", (done) => {

		const promisedTweets = Promise.resolve(dummyTweets);
		mockedAPI.__setPromisedResponse(promisedTweets);
		const wrapper = shallow(<TimelineUI />);

		promisedTweets.then(() => {
			expectTweets(wrapper, dummyTweets);
			done();
		});
	});

	// Simulate button click
	test("should update tweets on button click" , (done) => {
		const emptyPromise = Promise.resolve([]);
		mockedAPI.__setPromisedResponse(emptyPromise); // Start with blank tweets
		const wrapper = shallow(<TimelineUI />);

		emptyPromise.then(() => {
			expectErrorMessage(wrapper, EMPTY_TIMELINE_MESSAGE);

			const promisedTweets = Promise.resolve(dummyTweets);
			mockedAPI.__setPromisedResponse(promisedTweets); // Define updated tweets retrieved on button click
			const button = wrapper.find("div#timeline-div button#update-timeline").at(0);
			button.simulate("click");

			promisedTweets.then(() => {
				expectTweets(wrapper, dummyTweets);
				done();
			});
		});
	});

});
