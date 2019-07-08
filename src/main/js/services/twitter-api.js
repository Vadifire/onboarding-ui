import HttpMethods from "http-methods-enum";
import HttpStatuses from "http-status-codes";

export const maxTweetLength = 280;
export const messageKey = "message=";

export const tweetEndpoint = "http://localhost:8080/api/1.0/twitter/tweet";
export const homeTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline";
export const userTimelineEndpoint = "http://localhost:8080/api/1.0/twitter/timeline/user";
export function filteredHomeTimelineEndpoint(keyword) {
	return "http://localhost:8080/api/1.0/twitter/timeline/filter?keyword=" + keyword;
}

export function statusError(status) {
	return new Error("Received response with non-OK status code: " + status);
}

/*
 * Sends a GET request to endpoint then executes callback with parsed JSON resposne
 */
function fetchJson(callback, endpoint) {

	const xhttp = new XMLHttpRequest();
	xhttp.open(HttpMethods.GET, endpoint);

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
 * Fetches filtered tweets from home timeline
 *
 * Once done, executes callback with (err, tweets).
 */
export function fetchFilteredHomeTimeline(callback, keyword) {
	fetchJson(callback, filteredHomeTimelineEndpoint(keyword));
}

/*
 * Fetches tweets from home timeline
 *
 * Once done, executes callback with (err, tweets).
 */
export function fetchUserTimeline(callback) {
	fetchJson(callback, userTimelineEndpoint);
}

export function postTweet(callback, message) {
	var xhttp = new XMLHttpRequest();
	xhttp.open(HttpMethods.POST, tweetEndpoint);
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhttp.onreadystatechange = function() {
		if (this.readyState === XMLHttpRequest.DONE) {
			if (this.status === HttpStatuses.CREATED) {
				callback();
			} else {
				callback(statusError(this.status));
			}
		}
	};

	xhttp.send(messageKey + message);
}