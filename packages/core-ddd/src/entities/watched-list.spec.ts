import { TestWatchedList } from "@tests/entities/test-watched-list";

describe("WatchedList", () => {
	let testWatchedList: TestWatchedList;

	beforeEach(() => {
		testWatchedList = new TestWatchedList([1, 2, 3]);
	});

	it("should be able to create a watched list with initial items", () => {
		expect(testWatchedList.initial).toHaveLength(3);
		expect(testWatchedList.current).toHaveLength(3);
		expect(testWatchedList.new).toHaveLength(0);
		expect(testWatchedList.removed).toHaveLength(0);
	});

	it("should be able to add new items to the list", () => {
		testWatchedList.add(4);

		expect(testWatchedList.current).toHaveLength(4);
		expect(testWatchedList.new).toEqual([4]);
	});

	it("should not be able to add duplicate items", () => {
		testWatchedList.add(1);

		expect(testWatchedList.current).toHaveLength(3);
		expect(testWatchedList.new).toHaveLength(0);
	});

	it("should be able to remove an item and track removal", () => {
		testWatchedList.remove(2);

		expect(testWatchedList.current).toEqual([1, 3]);
		expect(testWatchedList.removed).toEqual([2]);
	});

	it("should be able to update the list correctly by removing missing items and adding new ones", () => {
		testWatchedList.update([1, 3, 4]);

		expect(testWatchedList.current).toEqual([1, 3, 4]);
		expect(testWatchedList.removed).toEqual([2]);
		expect(testWatchedList.new).toEqual([4]);
	});

	it("should be able to re-add a removed item correctly", () => {
		testWatchedList.remove(3);

		expect(testWatchedList.removed).toEqual([3]);

		testWatchedList.add(3);

		expect(testWatchedList.current).toContain(3);
		expect(testWatchedList.removed).not.toContain(3);
		expect(testWatchedList.new).toHaveLength(0);
	});
});
