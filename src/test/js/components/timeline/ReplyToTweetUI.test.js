import React from "react";
import { shallow } from "enzyme";
import ReplyToTweetUI from "../../../../main/js/components/timeline/ReplyToTweetUI";
import { expectOne } from "../../test-util";
import * as Api from "../../../../main/js/services/twitter-api";

describe("ReplyToTweetUI", () => {

	let replyUI, dummyMessage, dummyTweet, onClose;

	beforeAll(() => {
		onClose = jest.fn();
		Api.replyToTweet = jest.fn();
		dummyMessage = "some message";
		dummyTweet = {
			tweetId: 123
		};
		replyUI = shallow(<ReplyToTweetUI tweet={dummyTweet} onClose={onClose}/>);
	});

	afterEach(() => {
		Api.replyToTweet.mockClear();
	});

	function typeMessage(message) {
		const textInput = expectOne(replyUI, "TweetInput");
		textInput.simulate("change", {target: {value: message}});
		const sendReplyButton = expectOne(replyUI, "button.send-reply-button");
		sendReplyButton.simulate("click");
	}

	test("Should call onClose prop when close button is clicked", () => {
		const closeReplyModal = expectOne(replyUI, "button.close-reply-modal-button");
		closeReplyModal.simulate("click");
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	test("Should render successful reply message", done => {
		Api.replyToTweet.mockImplementation(callback => {
			callback();
			const result = expectOne(replyUI, "div.reply-result");
			expect(result.text()).toEqual(ReplyToTweetUI.successMessage);
			expect(Api.replyToTweet).toHaveBeenCalledWith(callback, dummyTweet.tweetId, dummyMessage);
			done();
		}, dummyTweet.tweetId, dummyMessage);
		typeMessage(dummyMessage);
	});

	test("Should render failed reply message", done => {
		Api.replyToTweet.mockImplementation(callback => {
			callback(Error);
			const result = expectOne(replyUI, "div.reply-result");
			expect(result.text()).toEqual(ReplyToTweetUI.failureMessage);
			expect(Api.replyToTweet).toHaveBeenCalledWith(callback, dummyTweet.tweetId, dummyMessage);
			done();
		}, dummyTweet.tweetId, dummyMessage);
		typeMessage(dummyMessage);
	});

});