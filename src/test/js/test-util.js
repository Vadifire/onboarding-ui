// Expect parent wrapper to have one child matched by selector, then return that child
export function expectOne(parent, selector) {
	const results = parent.find(selector);
	expect(results.length).toEqual(1);
	return results.at(0);
}