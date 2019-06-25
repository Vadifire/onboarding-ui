import { expectOne } from "../../test-util";

// Provides functions shared by timeline tests
export default class TimelineTestUtil {

	constructor(timelineUI, rootSelector) {
		this.timelineUI = timelineUI;
		this.rootSelector = rootSelector;
	}

	static get dummyTweets() {
		return [
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
	}

	getTimelineDiv() {
		return expectOne(this.timelineUI, this.rootSelector);
	}

	expectHeader(text) {
		const header = expectOne(this.getTimelineDiv(), "h3.title");
		expect(header.text()).toEqual(text);
	}

	expectButton(text) {
		const button = expectOne(this.getTimelineDiv(), "button.update-timeline");
		expect(button.prop("onClick")).toEqual(this.timelineUI.instance().updateTimeline);
		expect(button.text()).toEqual(text);
	}

	// Used in error message test cases
	expectErrorMessage(message, mockedFunc) {
		const timelineDiv = this.getTimelineDiv();
		const errorDiv = expectOne(this.getTimelineDiv(), "div.error-div");
		expect(errorDiv.text()).toEqual(message);
		expect(mockedFunc).toHaveBeenCalledTimes(1);
	}

	// Used in valid response test cases
	expectTweets(tweets, mockedFunc) {
		const tweetsDiv = expectOne(this.getTimelineDiv(), "div.tweets");
		const tweetBlocks = tweetsDiv.find("TweetBlock");
		tweetBlocks.forEach((tweetBlock, index) => {
			expect(tweetBlock.prop("tweet")).toEqual(tweets[index]);
		});
		expect(mockedFunc).toHaveBeenCalledTimes(1);
	}

}