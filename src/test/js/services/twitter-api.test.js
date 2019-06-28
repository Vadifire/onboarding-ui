import * as Api from "../../../main/js/services/twitter-api";
import HttpMethods from "http-methods-enum";
import HttpStatuses from "http-status-codes";

describe("twitter-api", () => {

	let mockedRequest, dummyKeyword;

	beforeAll(() => {
		mockedRequest = {
			open: jest.fn(),
			send: jest.fn(),
			readyState: XMLHttpRequest.DONE,
		};
		dummyKeyword = "some keyword";
		window.XMLHttpRequest = jest.fn(() => mockedRequest);
		window.XMLHttpRequest.DONE = mockedRequest.readyState;
	});

	/* Utility functions for code shared across fetch tests */

	function assertEndpointCalled(endpoint) { // Ensure XHR retrieves from correct endpoint
		expect(mockedRequest.open).toHaveBeenCalledTimes(1);
		expect(mockedRequest.open).toHaveBeenCalledWith(HttpMethods.GET, endpoint);
		mockedRequest.open.mockClear();
		expect(mockedRequest.send).toHaveBeenCalledTimes(1);
		mockedRequest.send.mockClear();
	}

	function testFetchStatusError(done, fetchFunc, endpoint, ...params) {
		mockedRequest.status = HttpStatuses.INTERNAL_SERVER_ERROR;
		fetchFunc((err) => {
			if (err) {
				expect(err).toEqual(Api.statusError(mockedRequest.status));
				assertEndpointCalled(endpoint);
				done();
			} else {
				done.fail();
			}
		}, ...params);
		mockedRequest.onreadystatechange();
	}

	function testFetchParseError(done, fetchFunc, endpoint, ...params) {
		mockedRequest.responseText = "Invalid JSON"; // Return invalid JSON
		mockedRequest.status = HttpStatuses.OK;
		fetchFunc((err) => {
			if (err) {
				assertEndpointCalled(endpoint);
				done();
			} else {
				done.fail();
			}
		}, ...params);
		mockedRequest.onreadystatechange();
	}

	function testFetchSuccess(done, fetchFunc, endpoint, ...params) {
		const dummyTweets = [{
			message: "some message"
		}];

		mockedRequest.responseText = JSON.stringify(dummyTweets); // Set response to valid tweets
		mockedRequest.status = HttpStatuses.OK;
		fetchFunc((err, tweets) => {
			if (err) {
				done.fail();
			}
			expect(tweets).toEqual(dummyTweets);
			assertEndpointCalled(endpoint);
			done();
		}, ...params);
		mockedRequest.onreadystatechange();
	}
	/* End of utility functions */


	/* Home Timeline Cases */
	test("should fetch from home timeline, then execute callback with error for non-OK status code", done => {
		testFetchStatusError(done, Api.fetchHomeTimeline, Api.homeTimelineEndpoint);
	});
	test("should fetch from home timeline, then execute callback with error when JSON parsing fails", done => {
		testFetchParseError(done, Api.fetchHomeTimeline, Api.homeTimelineEndpoint);
	});
	test("should successfully parse tweets from home timeline", done => {
		testFetchSuccess(done, Api.fetchHomeTimeline, Api.homeTimelineEndpoint);
	});

	/* User Timeline Cases */
	test("should fetch from user timeline, then execute callback with error for non-OK status code", done => {
		testFetchStatusError(done, Api.fetchUserTimeline, Api.userTimelineEndpoint);
	});
	test("should fetch from user timeline, with error when JSON parsing fails", done => {
		testFetchParseError(done, Api.fetchUserTimeline, Api.userTimelineEndpoint);
	});
	test("should successfully parse tweets from user timeline", done => {
		testFetchSuccess(done, Api.fetchUserTimeline, Api.userTimelineEndpoint);
	});

	/* Filtered Home Timeline Cases */
	test("should fetch from filtered timeline, then execute callback with error for non-OK status code", done => {
		testFetchStatusError(done, Api.fetchFilteredHomeTimeline, Api.filteredHomeTimelineEndpoint(dummyKeyword), 
			dummyKeyword);
	});
	test("should fetch from filtered timeline, then execute callback with error when JSON parsing fails", done => {
		testFetchStatusError(done, Api.fetchFilteredHomeTimeline, Api.filteredHomeTimelineEndpoint(dummyKeyword), 
			dummyKeyword);
	});
	test("should successfully parse tweets from filtered home timeline", done => {
		testFetchStatusError(done, Api.fetchFilteredHomeTimeline, Api.filteredHomeTimelineEndpoint(dummyKeyword), 
			dummyKeyword);
	});

});