import * as Api from "../../main/js/twitter-api";
import HttpMethods from "http-methods-enum";
import HttpStatuses from "http-status-codes";

describe("twitter-api", () => {

	let mockedRequest;

	beforeAll(() => {
		mockedRequest = {
			open: jest.fn(),
			send: jest.fn(),
			readyState: XMLHttpRequest.DONE,
		};
		window.XMLHttpRequest = jest.fn(() => mockedRequest);
		window.XMLHttpRequest.DONE = mockedRequest.readyState;
	});

	afterEach(() => { // Ensure XHR retrieves from correct endpoint
		expect(mockedRequest.open).toHaveBeenCalledTimes(1);
		expect(mockedRequest.open).toHaveBeenCalledWith(HttpMethods.GET, Api.homeTimelineEndpoint);
		mockedRequest.open.mockClear();
		expect(mockedRequest.send).toHaveBeenCalledTimes(1);
		mockedRequest.send.mockClear();
	});

	test("should attempt to fetch tweets and on non-OK status execute callback with error", done => {
		
		mockedRequest.status = HttpStatuses.INTERNAL_SERVER_ERROR;
		Api.fetchHomeTimeline((err, tweets) => {
			if (err) {
				expect(err).toEqual(Api.statusError(mockedRequest.status));
				done();
			} else {
				done.fail();
			}
		});
		mockedRequest.onreadystatechange();
	});

	test("should attempt to fetch tweets and on invalid json execute callback with error", done => {
		
		mockedRequest.responseText = "Invalid JSON"; // Return invalid JSON
		mockedRequest.status = HttpStatuses.OK;
		Api.fetchHomeTimeline((err, tweets) => {
			if (err) {
				done();
			} else {
				done.fail();
			}
		});
		mockedRequest.onreadystatechange();
	});

	test("should fetch from Api, parse tweets from JSON, and execute callback with tweets", done => {
		const dummyTweets = [{
			message: "some message"
		}];

		mockedRequest.responseText = JSON.stringify(dummyTweets); // Set response to valid tweets
		mockedRequest.status = HttpStatuses.OK;
		Api.fetchHomeTimeline((err, tweets) => {
			if (err) {
				done.fail();
			}
			expect(tweets).toEqual(dummyTweets);
			done();
		});
		mockedRequest.onreadystatechange();
	});

});