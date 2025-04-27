import { InMemoryCacheRepository } from "@tests/repositories/in-memory-cache-repository";

let inMemoryCacheRepository: InMemoryCacheRepository;

describe("Cache repository", () => {
	beforeEach(async () => {
		inMemoryCacheRepository = new InMemoryCacheRepository();
	});

	it("should be able to get an value", async () => {
		const key = "an:example:key";
		const value = {
			message: "An example value",
		};

		await inMemoryCacheRepository.items.set(key, JSON.stringify(value));

		const result = await inMemoryCacheRepository.get(key);

		expect(result).toEqual(JSON.stringify(value));
	});

	it("should be able to set an value", async () => {
		const key = "an:example:key";
		const value = {
			message: "An example value",
		};

		await inMemoryCacheRepository.set(key, JSON.stringify(value));

		expect(inMemoryCacheRepository.items.get(key)).toEqual(
			JSON.stringify(value),
		);
	});

	it("should be able to delete an value", async () => {
		const key = "an:example:key";
		const value = {
			message: "An example value",
		};

		await inMemoryCacheRepository.items.set(key, JSON.stringify(value));

		await inMemoryCacheRepository.del(key);

		expect(inMemoryCacheRepository.items.size).toEqual(0);
	});
});
