import React from "react";
import { shallow } from "enzyme";
import UserTimelineUI from "../../../../main/js/components/timeline/UserTimelineUI";
import { expectOne } from "../../test-util";
import * as Api from "../../../../main/js/twitter-api";

describe("UserTimelineUI", () => {

	let dummyTweets, timelineUI;

	function getTimelineDiv() {
		return expectOne(timelineUI, "div.user-timeline");
	}

	function expectHeader() {
		const header = expectOne(getTimelineDiv(timelineUI), "h3.title");
		expect(header.text()).toEqual(UserTimelineUI.timelineName);
	}

	function expectButton() {
		const button = expectOne(getTimelineDiv(timelineUI), "button.update-timeline");
		expect(button.prop("onClick")).toEqual(timelineUI.instance().updateTimeline);
		expect(button.text()).toEqual(UserTimelineUI.buttonText);
	}

	// Used in error message test cases
	function expectErrorMessage(message) {
		const timelineDiv = getTimelineDiv(timelineUI);
		const errorDiv = expectOne(getTimelineDiv(timelineUI), "div.error-div");
		expect(errorDiv.text()).toEqual(message);
		expect(Api.fetchUserTimeline).toHaveBeenCalledTimes(1);
	}

	// Used in valid response test cases
	function expectTweets(tweets) {
		const tweetsDiv = expectOne(getTimelineDiv(timelineUI), "div.tweets");
		const rows = tweetsDiv.find("div.row");
		rows.forEach((row, index) => {
			const tweetBlock = expectOne(row, "TweetBlock");
			expect(tweetBlock.prop("tweet")).toEqual(UserTimelineUI.formatTweet(tweets[index]));
		});
		expect(Api.fetchUserTimeline).toHaveBeenCalledTimes(1);
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
		Api.fetchUserTimeline = jest.fn();
		timelineUI = shallow(<UserTimelineUI />, {disableLifecycleMethods: true});
	});

	afterEach(() => {
		Api.fetchUserTimeline.mockClear();
	});

	// Test Api Error Case
	test("should render error message: '" + UserTimelineUI.apiErrorMessage + "'", done => {

		Api.fetchUserTimeline.mockImplementation(callback => {
			callback(Error());
			expectErrorMessage(UserTimelineUI.apiErrorMessage);
			done();
		});
		timelineUI.instance().updateTimeline();
		
	});

	// Test Empty Tweets Case
	test("should render error message: '" + UserTimelineUI.emptyTimelineMessage + "'", done => {

		Api.fetchUserTimeline.mockImplementation(callback => {
			callback(null, []);
			expectErrorMessage(UserTimelineUI.emptyTimelineMessage);
			done();
		});
		timelineUI.instance().updateTimeline();
	});


	// Test Non-Empty Tweets Case
	test("should render tweets", done => {

		Api.fetchUserTimeline.mockImplementation(callback => {
			callback(null, dummyTweets);
			expectTweets(dummyTweets);
			done();
		});
		timelineUI.instance().updateTimeline();
	});

	// Test rendering of button
	test("should render button", () => {
		expectButton();
	});

	// Test rendering of header
	test("should render header", () => {
		expectHeader();
	});

});
