import React from "react";
import { shallow } from "enzyme";
import ReplyToTweetUI from "../../../../main/js/components/timeline/ReplyToTweetUI";
import { expectOne } from "../../test-util";
import * as Api from "../../../../main/js/services/twitter-api";

describe("ReplyToTweetUI", () => {

	let replyUI, dummyMessage, dummyTweet;

	beforeAll(() => {
		Api.replyToTweet = jest.fn();
		dummyMessage = "some message";
		dummyTweet = {
			tweetId: 123
		};

	});

	beforeEach(() => {
		replyUI = shallow(<ReplyToTweetUI tweet={dummyTweet}/>);
	});

	afterEach(() => {
		Api.replyToTweet.mockClear();
	});

	function typeMessage(message) {
		const textArea = expectOne(replyUI, "textarea.reply-input");
		textArea.simulate("change", {target: {value: message}});
		const submitReplyButton = expectOne(replyUI, "button.send-reply-button");
		submitReplyButton.simulate("click");
	}

	test("Should not show modal by default", () => {
		const modal = replyUI.find(".reply-modal");
		expect(modal.prop("show")).toEqual(false);
	});

	test("Should show modal when reply button clicked", () => {
		const replyButton = expectOne(replyUI, ".open-reply");
		replyButton.simulate("click");
		const modal = expectOne(replyUI, ".reply-modal");
		expect(modal.prop("show")).toEqual(true);
	});

	test("Should render successful reply message", done => {
		Api.replyToTweet.mockImplementation(callback => {
			callback();
			const result = expectOne(replyUI, ".reply-result");
			expect(result.text()).toEqual(ReplyToTweetUI.successMessage);
			expect(Api.replyToTweet).toHaveBeenCalledWith(callback, dummyTweet.tweetId, dummyMessage);
			done();
		}, dummyTweet.tweetId, dummyMessage);
		typeMessage(dummyMessage);
	});

	test("Should render failed reply message", done => {
		Api.replyToTweet.mockImplementation(callback => {
			callback(Error);
			const result = expectOne(replyUI, ".reply-result");
			expect(result.text()).toEqual(ReplyToTweetUI.failureMessage);
			expect(Api.replyToTweet).toHaveBeenCalledWith(callback, dummyTweet.tweetId, dummyMessage);
			done();
		}, dummyTweet.tweetId, dummyMessage);
		typeMessage(dummyMessage);
	});

});