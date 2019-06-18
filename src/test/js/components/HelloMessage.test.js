import React from "react";
import { shallow } from "enzyme";
import HelloMessage from "../../../main/js/components/HelloMessage";
import {expectOne} from "../test-util";

describe("HelloMessage", () => {
	const dummyMessage = "2 + 2 = 5";
	const wrapper = shallow(<HelloMessage message={dummyMessage}/>);

	test("should render passed in message", () => {
		expect(wrapper.text()).toEqual(dummyMessage);
	});
	
	test("should contain a single hello message div", () => {
		expectOne(wrapper, "div.hello-message");
	});

});