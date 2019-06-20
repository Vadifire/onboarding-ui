import HttpMethods from "http-methods-enum";
import HttpStatuses from "http-status-codes";

export const homeTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline";

export function badStatusError(status) {
	return new Error("Received bad status code in response: " + status);
}

/*
 * Fetches tweets from home timeline
 *
 * Once done, executes callback with (err, tweets).
 */
export function fetchHomeTimeline(callback) {

	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = () => {
		if (xhttp.readyState === XMLHttpRequest.DONE) {
			if (xhttp.status === HttpStatuses.OK) {
				try {
					const tweets = JSON.parse(xhttp.responseText);
					callback(null, tweets);
				} catch (err) {
					callback(err);
				}
			} else {
				callback(badStatusError(xhttp.status));
			}
		} 
	};
	xhttp.open(HttpMethods.GET, homeTimelineEndpoint);
	xhttp.send();
}