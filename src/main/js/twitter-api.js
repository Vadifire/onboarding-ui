import HttpMethods from "http-methods-enum";
import HttpStatuses from "http-status-codes";

export const homeTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline";

export function statusError(status) {
	return new Error("Received bad status code in response: " + status);
}

/*
 * Fetches tweets from home timeline
 *
 * Once done, executes callback with (err, tweets).
 */
export function fetchHomeTimeline(callback) {

	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState === XMLHttpRequest.DONE) {
			if (this.status === HttpStatuses.OK) {
				try {
					const tweets = JSON.parse(this.responseText);
					callback(null, tweets);
				} catch (err) {
					callback(err);
				}
			} else {
				callback(statusError(this.status));
			}
		} 
	};
	xhttp.open(HttpMethods.GET, homeTimelineEndpoint);
	xhttp.send();
}