/*
 * Fetches tweets from home timeline
 *
 * Returns a Promise wrapping tweets or a rejected Promise
 */

export function fetchHomeTimeline() {
	return fetch("http://localhost:8080/api/1.0/twitter/timeline").then(response => { // Attempt to fetch tweets
		return response.json();
	}).then(tweets => { // Got JSON
		return tweets;
	});
}