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
		expect(mockedRequest.open).toHaveBeenCalledWith(Api.httpMethods.get, Api.homeTimelineEndpoint);
		mockedRequest.open.mockClear();
		expect(mockedRequest.send).toHaveBeenCalledTimes(1);
		mockedRequest.send.mockClear();
	});

	test("should attempt to fetch tweets and on reject execute callback with error", done => {
		
		mockedRequest.responseText = "Invalid JSON"; // Return invalid JSON
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