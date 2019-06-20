export const homeTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline";
export const httpMethods = {
	get: "GET"
}
/*
 * Fetches tweets from home timeline
 *
 * Once done, executes callback with (err, tweets).
 */
export function fetchHomeTimeline(callback) {

	const xhttp = new XMLHttpRequest();

	xhttp.open(httpMethods.get, homeTimelineEndpoint);
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === xhttp.DONE) {
			try {
				const tweets = JSON.parse(xhttp.responseText);
				callback(null, tweets);
			} catch (err) {
				callback(err);
			}
		} 
	};
	xhttp.send();
}