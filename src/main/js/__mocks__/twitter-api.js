var response;

// Mock API call
export function fetchHomeTimeline(callback) {
	callback(response);
}

export function __setResponse(res) {
	response = res;
}