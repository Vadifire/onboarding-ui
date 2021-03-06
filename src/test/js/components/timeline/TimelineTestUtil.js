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

	getUpdateButton() {
		return expectOne(this.getTimelineDiv(), "button.update-timeline");
	}

	expectHeader(text) {
		const header = expectOne(this.getTimelineDiv(), "h3.title");
		expect(header.text()).toEqual(text);
	}

	// Used in error message test cases
	expectErrorMessage(message, mockedFunc) {
		const timelineElem = expectOne(this.getTimelineDiv(), "MainTimelineElement");
		expect(timelineElem.prop("message")).toEqual(message);
		expect(timelineElem.prop("tweets")).toBeFalsy();
		if (mockedFunc) {
			expect(mockedFunc).toHaveBeenCalledTimes(1);
		}
	}

	// Used in valid response test cases
	expectTweets(tweets, mockedFunc, hideHandle) {
		const timelineElem = expectOne(this.getTimelineDiv(), "MainTimelineElement");
		expect(timelineElem.prop("tweets")).toEqual(tweets);
		expect(timelineElem.prop("message")).toBeFalsy();
		if (hideHandle) {
			expect(timelineElem.prop("hideHandle")).toEqual(true);
		}
		expect(mockedFunc).toHaveBeenCalledTimes(1);
	}

}