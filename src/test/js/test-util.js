export function expectOne(parent, selector) {
	const results = parent.find(selector);
	expect(results.length).toEqual(1);
	return results.at(0);
}