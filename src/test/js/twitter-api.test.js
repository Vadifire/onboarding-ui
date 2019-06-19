import * as Api from "../../main/js/twitter-api";

describe("twitter-api", () => {

	let someNum, mockXHR;

	beforeAll(() => {
		someNum = 4; // Just need readyState and DONE to be same
		mockXHR = {
			open: jest.fn(),
			send: jest.fn(),
			readyState: someNum,
			DONE: someNum,
		};
		window.XMLHttpRequest = jest.fn(() => mockXHR);
	});

	afterEach(() => { // Ensure XHR retrieves from correct endpoint
		expect(mockXHR.open).toHaveBeenCalledTimes(1);
		expect(mockXHR.open).toHaveBeenCalledWith("GET", Api.homeTimelineEndpoint);
		mockXHR.open.mockClear();
		expect(mockXHR.send).toHaveBeenCalledTimes(1);
		mockXHR.send.mockClear();
	});

	test("should attempt to fetch tweets and on reject return null", done => {
		
		mockXHR.responseText = "Invalid JSON"; // Return invalid JSON

		Api.fetchHomeTimeline(response => {
			expect(response).toBeNull();
			done();
		});

		mockXHR.onreadystatechange();
	});

	test("should fetch from Api, parse tweets from JSON, and call callback with tweets", done => {
		const tweets = [{
			message: "some message"
		}];

		mockXHR.responseText = JSON.stringify(tweets); // Set response to valid tweets

		Api.fetchHomeTimeline(response => {
			expect(response).toEqual(tweets);
			done();
		});

		mockXHR.onreadystatechange();
	});

});