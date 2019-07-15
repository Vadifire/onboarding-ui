import React from "react";
import { shallow } from "enzyme";

import TweetBlock from "../../../../main/js/components/timeline/TweetBlock";
import { expectOne } from "../../test-util";

describe("TweetBlock", () => {

	let dummyTweet;

	beforeAll(() => {
		dummyTweet = {
			message: "message",
			user: {
				profileImageUrl: "profile url",
				twitterHandle: "handle",
				name: "name"
			},
			createdAt: "123",
			url: "tweet url"
		};
	});

	test("should correctly lay out and render data from tweet prop", () => {
		const tweetBlock = shallow(<TweetBlock tweet={dummyTweet}/>);

		const tweetDiv = expectOne(tweetBlock, "div.tweet");

		const userDiv = expectOne(tweetDiv, "div.user-div");

		const contentDiv = expectOne(tweetDiv, "div.content-div");

		const profileImage = expectOne(userDiv, "img.profile-image");
		expect(profileImage.prop("src")).toEqual(dummyTweet.user.profileImageUrl);

		const displayName = expectOne(userDiv, "div.display-name");
		expect(displayName.text()).toEqual(dummyTweet.user.name);

		const twitterHandle = expectOne(userDiv, "div.twitter-handle");
		expect(twitterHandle.text()).toEqual(dummyTweet.user.twitterHandle);

		const date = expectOne(contentDiv, "div.date");
		expect(date.text()).toEqual(TweetBlock.formatDate(dummyTweet.createdAt));

		const message = expectOne(contentDiv, "div.message");
		expect(message.text()).toEqual(dummyTweet.message);

		const tweetLink = expectOne(message, "a.tweet-link");
		expect(tweetLink.prop("href")).toEqual(dummyTweet.url);
	});

	test("should show twitterHandle by default", () => {
		const tweetBlock = shallow(<TweetBlock tweet={dummyTweet}/>);
		expectOne(tweetBlock, ".twitter-handle");
	});

	test("should hide twitterHandle", () => {
		const tweetBlock = shallow(<TweetBlock tweet={dummyTweet} hideHandle={true} />);
		expect(tweetBlock.find(".twitter-handle").length).toEqual(0);
	});

	test("should have no reply option by default", () => {
		const tweetBlock = shallow(<TweetBlock tweet={dummyTweet} />);
		expect(tweetBlock.find("ReplyToTweetUI").length).toEqual(0);
	});

	test("should show reply option", () => {
		const openReplyFunction = jest.fn();
		const tweetBlock = shallow(<TweetBlock tweet={dummyTweet} openReplyFunction={openReplyFunction} />);
		const replyOption = expectOne(tweetBlock, "div.open-reply");
		replyOption.simulate("click");
		expect(openReplyFunction).toHaveBeenCalledTimes(1);
	});

	test("should render null in case of missing tweet prop", () => {
		const tweetBlock = shallow(<TweetBlock/>);
		expect(tweetBlock.type()).toEqual(null);
	});

	test("should render default display name if tweet.user prop missing", () => {
		const tweetBlock = shallow(<TweetBlock tweet={{}}/>);
		const displayName = expectOne(tweetBlock, "div.display-name");
		expect(displayName.text()).toEqual(TweetBlock.defaultDisplayName);
	});

});