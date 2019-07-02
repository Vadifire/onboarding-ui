import React from "react";
import { shallow } from "enzyme";
import PostTweetUI from "../../../main/js/components/PostTweetUI";
import { expectOne } from "../test-util";
import * as Api from "../../../main/js/services/twitter-api";

describe("PostTweetUI", () => {

	let tweetUI, dummyMessage;

	beforeAll(() => {
		dummyMessage = "some message";
		Api.postTweet = jest.fn();
		tweetUI = shallow(<PostTweetUI/>);
	});

	afterEach(() => {
		Api.postTweet.mockClear();
	});

	function typeMessage(message) {
		const textArea = expectOne(tweetUI, "textarea.tweet-input");
		textArea.simulate("change", {target: {value: message}});
		const button = expectOne(tweetUI, "button.post-tweet");
		button.simulate("click");
	}

	function expectResult(message) {
		const result = expectOne(tweetUI, "div.post-result");
		expect(result.text()).toEqual(message);
	}

	test("should render error message: " + PostTweetUI.failureMessage, done => {
		Api.postTweet.mockImplementation(callback => {
			callback(Error());
			expectResult(PostTweetUI.failureMessage);
			expect(Api.postTweet).toHaveBeenCalledWith(callback, dummyMessage);
			done();
		}, dummyMessage);
		typeMessage(dummyMessage);
	});

	test("should render success message: " + PostTweetUI.successMessage, done => {
		Api.postTweet.mockImplementation(callback => {
			callback();
			expectResult(PostTweetUI.successMessage);
			expect(Api.postTweet).toHaveBeenCalledWith(callback, dummyMessage);
			done();
		}, dummyMessage);
		typeMessage(dummyMessage);
	});
});