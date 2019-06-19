/*
 * Fetches tweets from home timeline
 *
 * Once tweets are fetched, callback is executed with tweets (or null in case of fail)
 */

export const homeTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline";

export function fetchHomeTimeline(callback) {

	const xhttp = new XMLHttpRequest();

	xhttp.open("GET", homeTimelineEndpoint);
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === xhttp.DONE) {
			try {
				const tweets = JSON.parse(xhttp.responseText);
				callback(tweets);
			} catch {
				callback(null);
			}
		}
	};
	xhttp.send();
}