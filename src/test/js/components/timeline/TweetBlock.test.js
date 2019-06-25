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

		const formattedTweet = TweetBlock.formatTweet(dummyTweet);

		const tweetDiv = expectOne(tweetBlock, "div.tweet");

		const userDiv = expectOne(tweetDiv, "div.user-div");

		const contentDiv = expectOne(tweetDiv, "div.content-div");

		const profileImage = expectOne(userDiv, "img.profile-image");
		expect(profileImage.prop("src")).toEqual(formattedTweet.user.profileImageUrl);

		const displayName = expectOne(userDiv, "div.display-name");
		expect(displayName.text()).toEqual(formattedTweet.user.name);

		const twitterHandle = expectOne(userDiv, "div.twitter-handle");
		expect(twitterHandle.text()).toEqual(formattedTweet.user.twitterHandle);

		const date = expectOne(contentDiv, "div.date");
		expect(date.text()).toEqual(formattedTweet.createdAt);

		const message = expectOne(contentDiv, "div.message");
		expect(message.text()).toEqual(formattedTweet.message);

		const tweetLink = expectOne(message, "a.tweet-link");
		expect(tweetLink.prop("href")).toEqual(formattedTweet.url);
	});

	test ("should hide twitterHandle", () => {
		const tweetBlock = shallow(<TweetBlock tweet={dummyTweet} hideHandle={true}/>);
		expect(tweetBlock.find("twitter-handle").length).toEqual(0);
	});

});