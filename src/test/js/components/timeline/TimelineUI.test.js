import React from "react";
import { shallow } from "enzyme";
import TimelineUI from "../../../../main/js/components/timeline/TimelineUI";
import { expectOne } from "../../test-util";

describe("TimelineUI", () => {

	let dummyTweets, timelineUI, mockedApiCall;

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
		expect(mockedApiCall).toHaveBeenCalledTimes(1);
	}

	// Used in valid response test cases
	function expectTweets(tweets) {
		const tweetsDiv = expectOne(getTimelineDiv(timelineUI), "div.tweets");
		const rows = tweetsDiv.find("div.row");
		rows.forEach((row, index) => {
			const tweetBlock = expectOne(row, "TweetBlock");
			expect(tweetBlock.prop("tweet")).toEqual(TimelineUI.formatTweet(tweets[index]));
		});
		expect(mockedApiCall).toHaveBeenCalledTimes(1);
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
		mockedApiCall = jest.fn();
		timelineUI = shallow(<TimelineUI apiCall={mockedApiCall}/>, {disableLifecycleMethods: true});
	});

	afterEach(() => {
		mockedApiCall.mockClear();
	});

	// Test Api Error Case
	test("should render error message: '" + TimelineUI.apiErrorMessage + "'", done => {

		mockedApiCall.mockImplementation(callback => {
			callback(Error());
			expectErrorMessage(TimelineUI.apiErrorMessage);
			done();
		});
		// TODO: avoid duplicate shallows
		timelineUI.instance().updateTimeline();
		
	});

	// Test Empty Tweets Case
	test("should render error message: '" + TimelineUI.emptyTimelineMessage + "'", done => {

		mockedApiCall.mockImplementation(callback => {
			callback(null, []);
			expectErrorMessage(TimelineUI.emptyTimelineMessage);
			done();
		});
		timelineUI.instance().updateTimeline();
	});


	// Test Non-Empty Tweets Case
	test("should render tweets", done => {

		mockedApiCall.mockImplementation(callback => {
			callback(null, dummyTweets);
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
