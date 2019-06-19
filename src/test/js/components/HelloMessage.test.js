import React from "react";
import { shallow } from "enzyme";
import HelloMessage from "../../../main/js/components/HelloMessage";
import { expectOne } from "../test-util";

describe("HelloMessage", () => {

	let dummyMessage, helloMessage;

	beforeAll(() => {
		dummyMessage = "2 + 2 = 5";
		helloMessage = shallow(<HelloMessage message={dummyMessage}/>);
	});

	test("should render passed in message", () => {
		expect(helloMessage.text()).toEqual(dummyMessage);
	});
	
	test("should contain a single hello message div", () => {
		expectOne(helloMessage, "div.hello-message");
	});

});