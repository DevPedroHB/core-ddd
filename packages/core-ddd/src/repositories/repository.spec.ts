import { fakerPT_BR as faker } from "@faker-js/faker";
import type { TestAggregateRoot } from "@tests/entities/test-aggregate-root";
import { TestFactory, makeTest } from "@tests/factories/test-factory";
import { InMemoryTestRepository } from "@tests/repositories/in-memory-test-repository";

let inMemoryTestRepository: InMemoryTestRepository;
let testFactory: TestFactory;

describe("Repository", () => {
	beforeEach(async () => {
		inMemoryTestRepository = new InMemoryTestRepository();
		testFactory = new TestFactory(inMemoryTestRepository);
	});

	it("should be able to fetch all", async () => {
		const testAggregateRoots: TestAggregateRoot[] = [];

		for (let i = 0; i < 3; i++) {
			testAggregateRoots.push(await testFactory.makeTest());
		}

		const result = await inMemoryTestRepository.fetchAll();

		expect(result).toHaveLength(3);
	});

	it("should be able to fetch all with options", async () => {
		const name = "John Doe";
		const createdDates = [];

		for (let i = 0; i < 9; i++) {
			const pastDate = faker.date.past();

			createdDates.push(pastDate);

			await testFactory.makeTest({
				name,
				createdAt: pastDate,
			});
		}

		const sortedDates = [...createdDates].sort(
			(a, b) => b.getTime() - a.getTime(),
		);

		const result = await inMemoryTestRepository.fetchAll({
			fields: {
				name,
			},
			orderBy: {
				createdAt: "desc",
			},
			pagination: {
				page: 1,
				perPage: 3,
			},
		});

		expect(result).toHaveLength(3);

		for (const item of result) {
			expect(item.name).toBe(name);
		}

		const firstThreeDates = sortedDates.slice(0, 3);

		result.forEach((item, index) => {
			expect(item.createdAt.getTime()).toBe(firstThreeDates[index].getTime());
		});

		const secondPageResult = await inMemoryTestRepository.fetchAll({
			fields: {
				name,
			},
			orderBy: {
				createdAt: "desc",
			},
			pagination: {
				page: 2,
				perPage: 3,
			},
		});

		expect(secondPageResult).toHaveLength(3);

		const nextThreeDates = sortedDates.slice(3, 6);

		secondPageResult.forEach((item, index) => {
			expect(item.createdAt.getTime()).toBe(nextThreeDates[index].getTime());
		});
	});

	it("should be able to find by fields", async () => {
		const testAggregateRoot = await testFactory.makeTest();

		const result = await inMemoryTestRepository.findByFields({
			name: testAggregateRoot.name,
		});

		expect(result).toEqual(testAggregateRoot);
	});

	it("should be able to create", async () => {
		const testAggregateRoot = makeTest();

		await inMemoryTestRepository.create(testAggregateRoot);

		expect(inMemoryTestRepository.items).toHaveLength(1);
	});

	it("should be able to update", async () => {
		const testAggregateRoot = await testFactory.makeTest();

		testAggregateRoot.name = "John Doe";
		testAggregateRoot.email = "example@email.com";
		testAggregateRoot.password = "PSW@p4ssw0rd";

		await inMemoryTestRepository.update(testAggregateRoot);

		expect(inMemoryTestRepository.items[0]).toEqual(testAggregateRoot);
	});

	it("should be able to delete", async () => {
		const testAggregateRoot = await testFactory.makeTest();

		await inMemoryTestRepository.delete(testAggregateRoot);

		expect(inMemoryTestRepository.items).toHaveLength(0);
	});
});
