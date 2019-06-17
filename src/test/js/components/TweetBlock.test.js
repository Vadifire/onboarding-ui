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

		const tweetDivs = wrapper.find("div.tweet");
		expect(tweetDivs.length).toEqual(1);

		const userDivs = tweetDivs.find("div.user-div");
		expect(userDivs.length).toEqual(1);

		const contentDivs = tweetDivs.find("div.content-div");
		expect(contentDivs.length).toEqual(1);

		const profileImages = userDivs.find("img.profile-image");
		expect(profileImages.length).toEqual(1);
		expect(profileImages.at(0).prop("src")).toEqual(dummyTweet.user.profileImageUrl);

		const displayNames = userDivs.find("div.display-name");
		expect(displayNames.length).toEqual(1);
		expect(displayNames.at(0).text()).toEqual(dummyTweet.user.name);

		const twitterHandles = userDivs.find("div.twitter-handle");
		expect(twitterHandles.length).toEqual(1);
		expect(twitterHandles.at(0).text()).toEqual(dummyTweet.user.twitterHandle);

		const dates = contentDivs.find("div.date");
		expect(dates.length).toEqual(1);
		expect(dates.at(0).text()).toEqual(dummyTweet.createdAt);

		const messages = contentDivs.find("div.message");
		expect(messages.length).toEqual(1);
		expect(messages.at(0).text()).toEqual(dummyTweet.message);

		const tweetLinks = messages.find("a.tweet-link");
		expect(tweetLinks.length).toEqual(1);
		expect(tweetLinks.at(0).prop("href")).toEqual(dummyTweet.url);

	});

});