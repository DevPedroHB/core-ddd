import type { FindByFields } from "@/types/find-by-fields";
import type { TestAggregateRoot } from "@tests/entities/test-aggregate-root";
import { TestFactory } from "@tests/factories/test-factory";
import { InMemoryTestRepository } from "@tests/repositories/in-memory-test-repository";
import { filterItemsByFields } from "./filter-items-by-fields";

let inMemoryTestRepository: InMemoryTestRepository;
let testFactory: TestFactory;

describe("filterItemsByFields", () => {
	beforeEach(async () => {
		inMemoryTestRepository = new InMemoryTestRepository();
		testFactory = new TestFactory(inMemoryTestRepository);

		for (let i = 0; i < 5; i++) {
			await testFactory.makeTest();
		}
	});

	it("should be able to returns original array when fields object is empty", () => {
		const items = inMemoryTestRepository.items;
		const fields: FindByFields<TestAggregateRoot> = {};

		expect(filterItemsByFields(items, fields)).toEqual(items);
	});

	it("should be able to returns empty array when no items match fields", async () => {
		const fields: FindByFields<TestAggregateRoot> = {
			name: "John Doe",
		};

		expect(filterItemsByFields(inMemoryTestRepository.items, fields)).toEqual(
			[],
		);
	});

	it("should be able to returns filtered array when items match fields", async () => {
		const fields: FindByFields<TestAggregateRoot> = {
			name: inMemoryTestRepository.items[0].name,
		};

		expect(filterItemsByFields(inMemoryTestRepository.items, fields)).toEqual([
			inMemoryTestRepository.items[0],
		]);
	});

	it("should be able to returns filtered array when multiple fields match", () => {
		const fields: FindByFields<TestAggregateRoot> = {
			name: inMemoryTestRepository.items[0].name,
			email: inMemoryTestRepository.items[0].email,
		};

		expect(filterItemsByFields(inMemoryTestRepository.items, fields)).toEqual([
			inMemoryTestRepository.items[0],
		]);
	});
});
