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
	function expectTweets(tweets) {
		const tweetsDiv = expectOne(getTimelineDiv(timelineUI), "div.tweets");
		const rows = tweetsDiv.find("div.row");
		rows.forEach((row, index) => {
			const tweetBlock = expectOne(row, "TweetBlock");
			expect(tweetBlock.prop("tweet")).toEqual(TimelineUI.formatTweet(tweets[index]));
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
	test("should render error message: '" + TimelineUI.apiErrorMessage + "'", done => {

		API.fetchHomeTimeline = jest.fn(cb => {
			cb(null);
			expectErrorMessage(TimelineUI.apiErrorMessage);
			done();
		});
		timelineUI.instance().updateTimeline();
		
	});

	// Test Empty Tweets Case
	test("should render error message: '" + TimelineUI.emptyTimelineMessage+"'", done => {

		API.fetchHomeTimeline = jest.fn(cb => {
			cb([]);
			expectErrorMessage(TimelineUI.emptyTimelineMessage);
			done();
		});
		timelineUI.instance().updateTimeline();
	});


	// Test Non-Empty Tweets Case
	test("should render tweets", done => {

		API.fetchHomeTimeline = jest.fn(cb => {
			cb(dummyTweets);
			expectTweets(dummyTweets);
			done();
		});
		timelineUI.instance().updateTimeline();
	});

	// Test rendering of button
	test("should render button", () => {
		expectButton(timelineUI);
	});



});
