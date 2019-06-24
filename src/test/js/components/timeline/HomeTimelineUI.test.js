import React from "react";
import { shallow } from "enzyme";
import HomeTimelineUI from "../../../../main/js/components/timeline/HomeTimelineUI";
import { expectOne } from "../../test-util";
import * as Api from "../../../../main/js/twitter-api";

describe("HomeTimelineUI", () => {

	let dummyTweets, timelineUI;

	function getTimelineDiv() {
		return expectOne(timelineUI, "div.home-timeline");
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
		expect(Api.fetchHomeTimeline).toHaveBeenCalledTimes(1);
	}

	// Used in valid response test cases
	function expectTweets(tweets) {
		const tweetsDiv = expectOne(getTimelineDiv(timelineUI), "div.tweets");
		const rows = tweetsDiv.find("div.row");
		rows.forEach((row, index) => {
			const tweetBlock = expectOne(row, "TweetBlock");
			expect(tweetBlock.prop("tweet")).toEqual(HomeTimelineUI.formatTweet(tweets[index]));
		});
		expect(Api.fetchHomeTimeline).toHaveBeenCalledTimes(1);
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
		Api.fetchHomeTimeline = jest.fn();
		timelineUI = shallow(<HomeTimelineUI />, {disableLifecycleMethods: true});
	});

	afterEach(() => {
		Api.fetchHomeTimeline.mockClear();
	});

	// Test Api Error Case
	test("should render error message: '" + HomeTimelineUI.apiErrorMessage + "'", done => {

		Api.fetchHomeTimeline.mockImplementation(callback => {
			callback(Error());
			expectErrorMessage(HomeTimelineUI.apiErrorMessage);
			done();
		});
		timelineUI.instance().updateTimeline();
		
	});

	// Test Empty Tweets Case
	test("should render error message: '" + HomeTimelineUI.emptyTimelineMessage + "'", done => {

		Api.fetchHomeTimeline.mockImplementation(callback => {
			callback(null, []);
			expectErrorMessage(HomeTimelineUI.emptyTimelineMessage);
			done();
		});
		timelineUI.instance().updateTimeline();
	});


	// Test Non-Empty Tweets Case
	test("should render tweets", done => {

		Api.fetchHomeTimeline.mockImplementation(callback => {
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
