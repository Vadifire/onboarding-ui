import React from "react";
import { shallow } from "enzyme";
import HelloMessage from "../../../main/js/components/HelloMessage";

describe("HelloMessage", () => {
	const dummyMessage = "2 + 2 = 5";
	const wrapper = shallow(<HelloMessage message={dummyMessage}/>);

	test("should render passed in message", () => {
		expect(wrapper.text()).toEqual(dummyMessage);
	});
	
	test("should contain div with 'hello-message' id", () => {
		expect(wrapper.find("div#hello-message").length).toEqual(1);
	});

});