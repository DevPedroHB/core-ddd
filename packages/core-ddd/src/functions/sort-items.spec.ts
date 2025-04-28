import { sortItems } from "./sort-items";

describe("sortItems", () => {
	it("should be able to sorts array by single field in asc order", () => {
		const items = [{ name: "c" }, { name: "a" }, { name: "b" }];

		expect(sortItems(items, { name: "asc" })).toEqual([
			{ name: "a" },
			{ name: "b" },
			{ name: "c" },
		]);
	});

	it("should be able to sorts array by single field in desc order", () => {
		const items = [{ name: "c" }, { name: "a" }, { name: "b" }];

		expect(sortItems(items, { name: "desc" })).toEqual([
			{ name: "c" },
			{ name: "b" },
			{ name: "a" },
		]);
	});

	it("should be able to sorts array by multiple fields", () => {
		const items = [
			{ name: "c", age: 2 },
			{ name: "a", age: 3 },
			{ name: "b", age: 1 },
		];

		expect(sortItems(items, { name: "asc", age: "desc" })).toEqual([
			{ name: "a", age: 3 },
			{ name: "b", age: 1 },
			{ name: "c", age: 2 },
		]);
	});

	it("should be able to handles array with duplicate values", () => {
		const items = [{ name: "a" }, { name: "a" }, { name: "b" }];

		expect(sortItems(items, { name: "asc" })).toEqual([
			{ name: "a" },
			{ name: "a" },
			{ name: "b" },
		]);
	});

	it("should be able to handles array with null or undefined values", () => {
		const items = [
			{ name: "a" },
			{ name: null },
			{ name: undefined },
			{ name: "b" },
		];

		expect(sortItems(items, { name: "asc" })).toEqual([
			{ name: "a" },
			{ name: "b" },
		]);
	});
});
