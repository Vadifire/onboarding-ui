/*
 * Fetches tweets from home timeline
 *
 * Returns a Promise wrapping tweets or a rejected Promise
 */

export const HOME_TIMELINE_ENDPOINT = "http://localhost:8080/api/1.0/twitter/timeline";

export function fetchHomeTimeline() {
	return fetch(HOME_TIMELINE_ENDPOINT).then(response => { // Attempt to fetch tweets
		return response.json();
	});
}