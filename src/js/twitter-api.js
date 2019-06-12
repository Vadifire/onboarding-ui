/*
 * Fetches tweets from home timeline
 *
 * Returns a promise with:
 * {
 *   tweets: [...]
 *   error: String
 * } 
 * Invariant: Exactly one of tweets or error will be null
 */
export function fetchHomeTimeline() {
	return fetch("http://localhost:8080/api/1.0/twitter/timeline").then(response => { // Attempt to fetch tweets
		if (response.ok === true) {
			return response.json();
		} else {
			return Promise.reject(new Error("Failed to fetch tweets. Server responded with status code: " + 
					response.status + ", error message: " + response.statusText));
		}
	}).then(tweets => { // Got JSON
		if (tweets.length > 0) {
			tweets.map(tweet => { // Populate default user to avoid reference error
			if (!tweet.user) {
				tweet.user = {
					name: "Unknown Handle"
				}
			}
			return tweet;
		});
			return {
				tweets, 
				error: null
			};
		} else {
			return {
				tweets: null,
				error: "Home timeline is empty."
			};
		}
	}).catch(error => { // Failed to fetch tweets
		return {
			tweets: null,
			error: "Failed to fetch home timeline. Please try again later."
		};
	});
}
