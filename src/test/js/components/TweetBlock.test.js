import React from "react";
import { shallow } from "enzyme";
import TweetBlock, {classNames} from "../../../main/js/components/TweetBlock";
import {expectOne} from "../test-util";

describe("TweetBlock", () => {

	test("should correctly lay out and render data from tweet prop", () => {

		const dummyTweet = {
			message: "message",
			user: {
				profileImageUrl: "profile url",
				twitterHandle: "handle",
				name: "name"
			},
			createdAt: "123",
			url: "tweet url"
		};
		const wrapper = shallow(<TweetBlock tweet={dummyTweet}/>);

		const tweetDiv = expectOne(wrapper, "div." + classNames.TWEET);

		const userDiv = expectOne(tweetDiv, "div." + classNames.USER_DIV);

		const contentDiv = expectOne(tweetDiv, "div." + classNames.CONTENT_DIV);

		const profileImage = expectOne(userDiv, "img." + classNames.PROFILE_IMAGE);
		expect(profileImage.prop("src")).toEqual(dummyTweet.user.profileImageUrl);

		const displayName = expectOne(userDiv, "div." + classNames.DISPLAY_NAME);
		expect(displayName.text()).toEqual(dummyTweet.user.name);

		const twitterHandle = expectOne(userDiv, "div." + classNames.TWITTER_HANDLE);
		expect(twitterHandle.text()).toEqual(dummyTweet.user.twitterHandle);

		const date = expectOne(contentDiv, "div." + classNames.DATE);
		expect(date.text()).toEqual(dummyTweet.createdAt);

		const message = expectOne(contentDiv, "div." + classNames.MESSAGE);
		expect(message.text()).toEqual(dummyTweet.message);

		const tweetLink = expectOne(message, "a." + classNames.TWEET_LINK);
		expect(tweetLink.prop("href")).toEqual(dummyTweet.url);

	});

});