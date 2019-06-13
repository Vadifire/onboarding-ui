import {fetchHomeTimeline} from "../../main/js/twitter-api";
global.fetch = require('jest-fetch-mock');

describe("twitter-api", () => {

	beforeEach(() => {
		fetch.resetMocks()
	});

	afterEach(() => {
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual("http://localhost:8080/api/1.0/twitter/timeline");
	});

	test("should attempt to fetch tweets and on reject return promise with error", done => {
		fetch.mockReject();

		fetchHomeTimeline().then(response => {
			expect(response.error).toEqual("Failed to fetch home timeline. Please try again later.");
			expect(response.tweets).toBeNull();
			done();
		});
	});

	test("should attempt to fetch tweets and on OK return promise with empty timeline 'error'", done => {
		fetch.mockResponse(JSON.stringify({}));

		fetchHomeTimeline().then(response => {
			expect(response.error).toEqual("Home timeline is empty.");
			expect(response.tweets).toBeNull();
			done();
		});
	});

	test("should attempt to fetch tweets and on OK return return promise with tweets", done => {
		const tweets = [{
			user: {}
		}];
		fetch.mockResponse(JSON.stringify(tweets));

		fetchHomeTimeline().then(response => {
			expect(response.error).toBeNull();
			expect(response.tweets).toEqual(tweets);
			done();
		});
	});

	test("should attempt to fetch tweets and on OK return tweets with missing user replaced", done => {
		fetch.mockResponse(JSON.stringify([{}]));

		fetchHomeTimeline().then(response => {
			expect(response.error).toBeNull();
			expect(response.tweets).toEqual([{
				user: {
					name: "Unknown User"
				}
			}]);
			done();
		});
	});

});