import React from "react";
import { shallow } from "enzyme";
import TweetBlock from "../../../main/js/components/TweetBlock";

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

		const tweetDiv = wrapper.find("div.tweet");
		expect(tweetDiv.length).toEqual(1);

		const userDiv = tweetDiv.find("div.user-div");
		expect(userDiv.length).toEqual(1);

		const contentDiv = tweetDiv.find("div.content-div");
		expect(contentDiv.length).toEqual(1);

		const profileImages = userDiv.find("img.profile-image");
		expect(profileImages.length).toEqual(1);
		expect(profileImages.at(0).prop("src")).toEqual(dummyTweet.user.profileImageUrl);

		const displayName = userDiv.find("div.display-name");
		expect(displayName.length).toEqual(1);
		expect(displayName.at(0).text()).toEqual(dummyTweet.user.name);

		const twitterHandles = userDiv.find("div.twitter-handle");
		expect(twitterHandles.length).toEqual(1);
		expect(twitterHandles.at(0).text()).toEqual(dummyTweet.user.twitterHandle);

		const dates = contentDiv.find("div.date");
		expect(dates.length).toEqual(1);
		expect(dates.at(0).text()).toEqual(dummyTweet.createdAt);

		const messages = contentDiv.find("div.message");
		expect(messages.length).toEqual(1);
		expect(messages.at(0).text()).toEqual(dummyTweet.message);

		const tweetLinks = messages.find("a.tweet-link");
		expect(tweetLinks.length).toEqual(1);
		expect(tweetLinks.at(0).prop("href")).toEqual(dummyTweet.url);

	});

});