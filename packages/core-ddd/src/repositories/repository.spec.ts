import { InMemoryTestRepository } from "@tests/repositories/in-memory-test-repository";

let inMemoryTestRepository: InMemoryTestRepository;

describe("Repository", () => {
	beforeEach(() => {
		inMemoryTestRepository = new InMemoryTestRepository();
	});

	it("should be able to fetch all", async () => {});

	it("should be able to find by fields", async () => {});

	it("should be able to create", async () => {});

	it("should be able to update", async () => {});

	it("should be able to delete", async () => {});
});
