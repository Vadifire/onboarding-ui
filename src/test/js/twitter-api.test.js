import {fetchHomeTimeline} from "../../main/js/twitter-api";

describe("twitter-api", () => {

	beforeEach(() => {
		fetch.resetMocks()
	});

	afterEach(() => {
		expect(fetch.mock.calls.length).toEqual(1);
		expect(fetch.mock.calls[0][0]).toEqual("http://localhost:8080/api/1.0/twitter/timeline");
	});

	test("should attempt to fetch tweets and on reject return promise with error", () => {
		fetch.mockReject();

		fetchHomeTimeline().then((response) => {
			expect(response.error).toEqual("Failed to fetch home timeline. Please try again later.");
			expect(response.tweets).toBeNull();
		});
	});

	test("should attempt to fetch tweets and on OK return promise with empty timeline 'error'", () => {
		fetch.mockResponse(JSON.stringify({}));

		fetchHomeTimeline().then((response) => {
			expect(response.error).toEqual("Home timeline is empty.");
			expect(response.tweets).toBeNull();
		});
	});

	test("should attempt to fetch tweets and on OK return return promise with tweets", () => {
		const tweets = [{
			user: {

			}
		}];
		fetch.mockResponse(JSON.stringify(tweets));

		fetchHomeTimeline().then((response) => {
			expect(response.error).toBeNull();
			expect(response.tweets).toEqual(tweets);
		});
	});

	test("should attempt to fetch tweets and on OK return tweets with missing user replaced", () => {
		fetch.mockResponse(JSON.stringify([{}]));

		fetchHomeTimeline().then((response) => {
			expect(response.error).toBeNull();
			expect(response.tweets).toEqual([{
				user: {
					name: "Unknown User"
				}
			}]);
		});
	});

});