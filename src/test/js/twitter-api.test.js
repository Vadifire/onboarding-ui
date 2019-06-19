import * as Api from "../../main/js/twitter-api";

describe("twitter-api", () => {

	let mockedRequest;

	beforeAll(() => {
		mockedRequest = {
			open: jest.fn(),
			send: jest.fn(),
			readyState: XMLHttpRequest.DONE,
			DONE: XMLHttpRequest.DONE
		};
		window.XMLHttpRequest = jest.fn(() => mockedRequest);
	});

	afterEach(() => { // Ensure XHR retrieves from correct endpoint
		expect(mockedRequest.open).toHaveBeenCalledTimes(1);
		expect(mockedRequest.open).toHaveBeenCalledWith("GET", Api.homeTimelineEndpoint);
		mockedRequest.open.mockClear();
		expect(mockedRequest.send).toHaveBeenCalledTimes(1);
		mockedRequest.send.mockClear();
	});

	test("should attempt to fetch tweets and on reject execute callback with null", done => {
		
		mockedRequest.responseText = "Invalid JSON"; // Return invalid JSON
		Api.fetchHomeTimeline(response => {
			expect(response).toBeNull();
			done();
		});
		mockedRequest.onreadystatechange();
	});

	test("should fetch from Api, parse tweets from JSON, and execute callback with tweets", done => {
		const tweets = [{
			message: "some message"
		}];

		mockedRequest.responseText = JSON.stringify(tweets); // Set response to valid tweets
		Api.fetchHomeTimeline(response => {
			expect(response).toEqual(tweets);
			done();
		});
		mockedRequest.onreadystatechange();
	});

});