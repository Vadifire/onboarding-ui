import {fetchHomeTimeline, HOME_TIMELINE_ENDPOINT} from "../../main/js/twitter-api";
global.fetch = require('jest-fetch-mock');

describe("twitter-api", () => {

	beforeEach(() => {
		fetch.resetMocks()
	});

	afterEach(() => {
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual(HOME_TIMELINE_ENDPOINT);
	});

	test("should attempt to fetch tweets and on reject let error propogate", done => {
		const error = new Error("an error");
		fetch.mockReject(error);

		fetchHomeTimeline().catch(err => {
			expect(err).toEqual(error);
			done();
		});
	});

	test("should fetch tweets from API, parse from JSON, and return tweets", done => {
		const tweets = [{
			user: {},
			message: "some message"
		}];
		fetch.mockResponse(JSON.stringify(tweets));

		fetchHomeTimeline().then(response => {
			expect(response).toEqual(tweets);
			done();
		});
	});

});