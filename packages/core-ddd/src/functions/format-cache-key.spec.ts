import { formatCacheKey } from "./format-cache-key";

describe("formatCacheKey", () => {
	it("should be able to return prefix only when content object is empty", () => {
		const prefix = "my-prefix";
		const content = {};
		const expected = "my-prefix";

		expect(formatCacheKey(prefix, content)).toBe(expected);
	});

	it("should be able to format single key-value pair correctly", () => {
		const prefix = "my-prefix";
		const content = { foo: "bar" };
		const expected = "my-prefix:bar:foo";

		expect(formatCacheKey(prefix, content)).toBe(expected);
	});

	it("should be able to format multiple key-value pairs correctly", () => {
		const prefix = "my-prefix";
		const content = { foo: "bar", baz: "qux" };
		const expected = "my-prefix:bar:foo:qux:baz";

		expect(formatCacheKey(prefix, content)).toBe(expected);
	});

	it("should be able to slugify non-string values correctly", () => {
		const prefix = "my-prefix";
		const content = { foo: 123, baz: true };
		const expected = "my-prefix:123:foo:true:baz";

		expect(formatCacheKey(prefix, content)).toBe(expected);
	});
});
