/*
 * Fetches tweets from home timeline
 *
 * Returns a promise wrapping tweets
 */
export function fetchHomeTimeline() {
	return fetch("http://localhost:8080/api/1.0/twitter/timeline").then(response => { // Attempt to fetch tweets
		if (!response.ok) {
			throw Error("Failed to fetch tweets from home timeline. Server responded with status code: " +
					response.status + ", error message: " + response.statusText);
		}
		return response.json();
	}).then(tweets => { // Got JSON
		tweets[1].user = null;
		tweets.map(tweet => { // Populate default user to avoid reference error
			if (!tweet.user) {
				tweet.user = {
					name: "Unknown User",
					displayHandle: "",
					profileImageUrl: ""
				}
			}
			return tweet;
		});
		console.log(tweets);
		return tweets;
	});
}
