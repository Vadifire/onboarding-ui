import React from "react";
import { shallow } from "enzyme";

import TweetInput from "../../../main/js/components/TweetInput";
import { expectOne } from "../test-util";

describe("TweetInput", () => {

	let tweetInput, dummyInputText, mockedOnChange;

	beforeAll(() => {
		mockedOnChange = jest.fn();
		dummyInputText = "some input";
		tweetInput = shallow(<TweetInput input={dummyInputText} onChange={mockedOnChange}/>);
	});

	test("Should display textarea with passed in props", () => {
		const textArea = expectOne(tweetInput, "textarea.tweet-input");
		expect(textArea.prop("onChange")).toEqual(mockedOnChange);
		expect(textArea.prop("value")).toEqual(dummyInputText);
	});
});