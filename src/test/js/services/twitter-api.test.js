import * as Api from "../../../main/js/services/twitter-api";
import HttpMethods from "http-methods-enum";
import HttpStatuses from "http-status-codes";

describe("twitter-api", () => {

	let mockedRequest, dummyString, dummyParentId;

	beforeAll(() => {
		mockedRequest = {
			open: jest.fn(),
			send: jest.fn(),
			setRequestHeader: jest.fn(),
			readyState: XMLHttpRequest.DONE,
		};
		dummyString = "some string";
		dummyParentId = 123;
		window.XMLHttpRequest = jest.fn(() => mockedRequest);
		window.XMLHttpRequest.DONE = mockedRequest.readyState;
	});

	/* Utility functions for code shared across fetch tests */

	function assertEndpointCalled(endpoint, method = HttpMethods.GET) { // Ensure XHR retrieves from correct endpoint
		expect(mockedRequest.open).toHaveBeenCalledTimes(1);
		expect(mockedRequest.open).toHaveBeenCalledWith(method, endpoint);
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
		testFetchStatusError(done, Api.fetchFilteredHomeTimeline, Api.filteredHomeTimelineEndpoint(dummyString),
			dummyString);
	});
	test("should fetch from filtered timeline, then execute callback with error when JSON parsing fails", done => {
		testFetchStatusError(done, Api.fetchFilteredHomeTimeline, Api.filteredHomeTimelineEndpoint(dummyString),
			dummyString);
	});
	test("should successfully parse tweets from filtered home timeline", done => {
		testFetchStatusError(done, Api.fetchFilteredHomeTimeline, Api.filteredHomeTimelineEndpoint(dummyString),
			dummyString);
	});

	/* Post Tweet Cases */
	test("should successfully post tweet", done => {
		mockedRequest.status = HttpStatuses.CREATED;
		Api.postTweet((err) => {
			if (err) {
				done.fail();
			}
			expect(mockedRequest.send).toHaveBeenCalledWith(Api.postTweetParams(dummyString));
			assertEndpointCalled(Api.tweetEndpoint, HttpMethods.POST);
			done();
		}, dummyString);
		mockedRequest.onreadystatechange();
	});

	test("should fail to post tweet and execute callback with error", done => {
		mockedRequest.status = HttpStatuses.INTERNAL_SERVER_ERROR;
		Api.postTweet((err) => {
			if (err) {
				expect(mockedRequest.send).toHaveBeenCalledWith(Api.postTweetParams(dummyString));
				assertEndpointCalled(Api.tweetEndpoint, HttpMethods.POST);
				done();
			} else {
				done.fail();
			}
		}, dummyString);
		mockedRequest.onreadystatechange();
	});

	/* Reply to Tweet Cases */
	test("should successfully reply to tweet", done => {
		mockedRequest.status = HttpStatuses.CREATED;
		Api.replyToTweet((err) => {
			if (err) {
				done.fail();
			}
			expect(mockedRequest.send).toHaveBeenCalledWith(Api.replyToTweetParams(dummyParentId, dummyString));
			assertEndpointCalled(Api.replyEndpoint, HttpMethods.POST);
			done();
		}, dummyParentId, dummyString);
		mockedRequest.onreadystatechange();

	});
	test("should fail to reply to tweet and execute callback with error", done => {
		Api.replyToTweet((err) => {
			if (err) {
				expect(mockedRequest.send).toHaveBeenCalledWith(Api.replyToTweetParams(dummyParentId, dummyString));
				assertEndpointCalled(Api.replyEndpoint, HttpMethods.POST);
				done();
			} else {
				done();
			}
		}, dummyParentId, dummyString);
		mockedRequest.onreadystatechange();
	});





});