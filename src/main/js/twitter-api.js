export const homeTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline";
import HttpMethodsEnum from 'http-methods-enum';

/*
 * Fetches tweets from home timeline
 *
 * Once done, executes callback with (err, tweets).
 */
export function fetchHomeTimeline(callback) {

	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = () => {
		if (xhttp.readyState === XMLHttpRequest.DONE) {
			try {
				const tweets = JSON.parse(xhttp.responseText);
				callback(null, tweets);
			} catch (err) {
				callback(err);
			}
		} 
	};
	xhttp.open(HttpMethodsEnum.GET, homeTimelineEndpoint);
	xhttp.send();
}