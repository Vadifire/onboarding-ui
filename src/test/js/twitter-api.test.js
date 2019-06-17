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
		const error = new Error("an error");
		fetch.mockReject(error);

		fetchHomeTimeline().catch(err => {
			expect(err).toEqual(error);
			done();
		});
	});

	test("should attempt to fetch tweets and on OK return return promise with tweets", done => {
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