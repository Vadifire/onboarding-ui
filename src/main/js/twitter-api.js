import HttpMethods from "http-methods-enum";
import HttpStatuses from "http-status-codes";

export const homeTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline";
export const userTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline/user";

export function statusError(status) {
	return new Error("Received bad status code in response: " + status);
}

/*
 * Sends a GET request to endpoint then executes callback with parsed JSON resposne
 */
function fetchJson(callback, endpoint) {

	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState === XMLHttpRequest.DONE) {
			if (this.status === HttpStatuses.OK) {
				try {
					callback(null, JSON.parse(this.responseText));
				} catch (err) {
					callback(err);
				}
			} else {
				callback(statusError(this.status));
			}
		} 
	};
	xhttp.open(HttpMethods.GET, endpoint);
	xhttp.send();
}

/*
 * Fetches tweets from home timeline
 *
 * Once done, executes callback with (err, tweets).
 */
export function fetchHomeTimeline(callback) {
	fetchJson(callback, homeTimelineEndpoint);
}

/*
 * Fetches tweets from home timeline
 *
 * Once done, executes callback with (err, tweets).
 */
export function fetchUserTimeline(callback) {
	fetchJson(callback, userTimelineEndpoint);
}
