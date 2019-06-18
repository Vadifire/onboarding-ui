import {fetchHomeTimeline, HOME_TIMELINE_ENDPOINT} from "../../main/js/twitter-api";

const someNum = 4; // Just need readyState and DONE to be same
const mockXHR = {
	open: jest.fn(),
	send: jest.fn(),
	readyState: someNum,
	DONE: someNum,
};
window.XMLHttpRequest = jest.fn(() => mockXHR);

describe("twitter-api", () => {


	test("should attempt to fetch tweets and on reject let error propogate", done => {
		
		mockXHR.responseText = "Invalid JSON"; // Return invalid JSON

		fetchHomeTimeline(response => {
			expect(response).toBeNull();
			done();
		});

		mockXHR.onreadystatechange();
	});

	test("should fetch from API, parse tweets from JSON, and call callback with tweets", done => {
		const tweets = [{
			message: "some message"
		}];

		mockXHR.responseText = JSON.stringify(tweets); // Set response to valid tweets

		fetchHomeTimeline(response => {
			expect(response).toEqual(tweets);
			done();
		});

		mockXHR.onreadystatechange();
	});

});