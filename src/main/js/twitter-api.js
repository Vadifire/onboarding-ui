export const homeTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline";

/*
 * Fetches tweets from home timeline
 *
 * Once done, executes callback with (err, tweets).
 */
export function fetchHomeTimeline(callback) {

	const xhttp = new XMLHttpRequest();

	xhttp.open("GET", homeTimelineEndpoint);
	xhttp.onreadystatechange = function() {
		try {
			if (xhttp.readyState === xhttp.DONE) {
				const tweets = JSON.parse(xhttp.responseText);
				callback(null, tweets);
			}
		} catch (err) {
			callback(err);
		}
	};
	xhttp.send();
}