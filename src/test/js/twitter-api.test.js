import * as Api from "../../main/js/twitter-api";

describe("twitter-api", () => {

	let someNum, mockXHR;

	beforeAll(() => {
		mockXHR = {
			open: jest.fn(),
			send: jest.fn(),
			readyState: XMLHttpRequest.DONE,
			DONE: XMLHttpRequest.DONE
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

	test("should attempt to fetch tweets and on reject execute callback with null", done => {
		
		mockXHR.responseText = "Invalid JSON"; // Return invalid JSON

		Api.fetchHomeTimeline(response => {
			expect(response).toBeNull();
			done();
		});

		mockXHR.onreadystatechange();
	});

	test("should fetch from Api, parse tweets from JSON, and execute callback with tweets", done => {
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