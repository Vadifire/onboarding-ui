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
		if (!response.ok) {
			throw new Error("Failed to fetch tweets. Server responded with status code: " + 
					response.status + ", error message: " + response.statusText);
		} else {
			return response.json();
		}
	}).then(tweets => { // Got JSON
		if (tweets.length > 0) {
			tweets.map(tweet => { // Populate default user to avoid reference error
				if (!tweet.user) {
					tweet.user = {
						name: "Unknown User"
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
		console.log(error);
		return {
			tweets: null,
			error: "Failed to fetch home timeline. Please try again later."
		};
	});
}
