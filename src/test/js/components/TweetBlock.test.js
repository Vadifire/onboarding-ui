import React from "react";
import { shallow } from "enzyme";
import TweetBlock from "../../../main/js/components/TweetBlock";

describe("TweetBlock", () => {

	const dummyTweet = {
		message: "message",
		user: {
			profileImageUrl: "profile url",
			twitterHandle: "handle",
			name: "name"
		},
		createdAt: "123",
		url: "tweet url"

	}

	const wrapper = shallow(<TweetBlock tweet={dummyTweet}/>);

	// Declare UI elements
	var tweetDiv, userDiv, profileImage, displayName, twitterHandle, contentDiv, date, message, tweetLink;

	it("should adhere to correct tweet layout", () => {
		tweetDiv = wrapper.find("div.tweet");
		expect(tweetDiv.length).toEqual(1);

		userDiv = tweetDiv.find("div.user-div");
		expect(userDiv.length).toEqual(1);

		profileImage = userDiv.find("img.profile-image");
		expect(profileImage.length).toEqual(1);

		displayName = userDiv.find("div.display-name");
		expect(displayName.length).toEqual(1);

		twitterHandle = userDiv.find("div.twitter-handle");
		expect(twitterHandle.length).toEqual(1);

		contentDiv = tweetDiv.find("div.content-div");
		expect(contentDiv.length).toEqual(1);

		date = contentDiv.find("div.date");
		expect(date.length).toEqual(1);

		message = contentDiv.find("div.message");
		expect(message.length).toEqual(1);

		tweetLink = message.find("a.tweet-link");
		expect(tweetLink.length).toEqual(1);
	});

	it("profile image should be provided by tweet", () => {
		expect(profileImage.at(0).prop("src")).toEqual(dummyTweet.user.profileImageUrl);
	});

	it("display name should match that of tweet", () => {
		expect(displayName.at(0).text()).toEqual(dummyTweet.user.name);
	});

	it("twitter handle should match that of tweet", () => {
		expect(twitterHandle.at(0).text()).toEqual(dummyTweet.user.twitterHandle);
	});

	it("date should match that of tweet and be in American month/day format", () => {
		expect(date.at(0).text())
				.toEqual(new Date(dummyTweet.createdAt).toLocaleString("en-us", {month: "short", day: "numeric"})
		);
	});

	it("message should link to tweet url", () => {
		expect(tweetLink.at(0).prop("href")).toEqual(dummyTweet.url);
	});

});