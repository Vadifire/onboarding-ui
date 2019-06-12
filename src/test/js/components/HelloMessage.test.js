import React from "react";
import { shallow } from "enzyme";
import HelloMessage from "../../../main/js/components/HelloMessage";

describe("HelloMessage", () => {
	const dummyMessage = "2 + 2 = 5";
	const wrapper = shallow(<HelloMessage message={dummyMessage}/>);
	it("should render passed in message", () => {
		expect(wrapper.text()).toEqual(dummyMessage);
	});
	it("should contain div with 'hello-message' id", () => {
		expect(wrapper.find("div#hello-message").length).toEqual(1);
	});

});