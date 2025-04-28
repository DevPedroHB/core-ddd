import { paginateItems } from "./paginate-items";

describe("paginateItems", () => {
	it("should be able to return original array when pagination object has default values", () => {
		const items = [1, 2, 3, 4, 5];
		const pagination = { page: 1, perPage: 10 };

		expect(paginateItems(items, pagination)).toEqual(items);
	});

	it("should be able to return paginated array with valid page and perPage values", () => {
		const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const pagination = { page: 2, perPage: 5 };

		expect(paginateItems(items, pagination)).toEqual([6, 7, 8, 9, 10]);
	});

	it("should be able to return empty array when page value is greater than total pages", () => {
		const items = [1, 2, 3, 4, 5];
		const pagination = { page: 3, perPage: 5 };

		expect(paginateItems(items, pagination)).toEqual([]);
	});

	it("should be able to return single item array when pagination is valid", () => {
		const items = [1];
		const pagination = { page: 1, perPage: 1 };

		expect(paginateItems(items, pagination)).toEqual([1]);
	});
});
