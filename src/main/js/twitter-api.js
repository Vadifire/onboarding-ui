/*
 * Fetches tweets from home timeline
 *
 * Returns a Promise wrapping tweets or a rejected Promise
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