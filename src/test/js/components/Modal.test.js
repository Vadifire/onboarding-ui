import React from "react";
import { shallow } from "enzyme";
import Modal from "../../../main/js/components/Modal";
import { expectOne } from "../test-util";

describe("Modal", () => {

	let modalChild, onClose;

	beforeAll(() => {
		onClose = jest.fn();
		modalChild = <div id="modal-child">My parent is a modal.</div>;
	});

	test("should display modal with passed in child", () => {
		const modal = shallow(
			<Modal show={true}>
				{modalChild}
			</Modal>
		);
		expectOne(modal, "#modal-child");
	});
	
	test("should display nothing if modal if show prop is false", () => {
		const modal = shallow(
			<Modal show={false}>
				{modalChild}
			</Modal>
		);
		expect(modal.children().length).toEqual(0);
	});

	test("should call onClose prop when X button is clicked", () => {
		const modal = shallow(
			<Modal show={true} onClose={onClose}/>
		);
		const xButton = expectOne(modal, ".close-modal-span");
		xButton.simulate("click");
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});