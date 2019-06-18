import * as API from "../../main/js/twitter-api";

describe("twitter-api", () => {

	afterEach(() => {
		expect(global.fetch).toHaveBeenCalledTimes(1);
		global.fetch.mockReset();
	});

	test("should attempt to fetch tweets and on reject let error propogate", done => {
		const error = new Error("an error");
		global.fetch = jest.fn(() => Promise.reject(error));

		API.fetchHomeTimeline().catch(err => {
			expect(err).toEqual(error);
			done();
		});
	});

	test("should fetch tweets from API, parse from JSON, and return tweets", done => {
		const tweets = [{
			user: {},
			message: "some message"
		}];
		global.fetch = jest.fn(() => {
			return Promise.resolve({json: () => tweets});
		});

		API.fetchHomeTimeline().then(response => {
			expect(response).toEqual(tweets);
			done();
		});
	});

});