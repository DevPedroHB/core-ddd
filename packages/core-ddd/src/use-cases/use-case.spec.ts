import { AlreadyExistsError } from "@/errors/already-exists-error";
import { TestFactory, makeTest } from "@tests/factories/test-factory";
import { InMemoryTestRepository } from "@tests/repositories/in-memory-test-repository";
import { TestUseCase } from "@tests/use-cases/test-use-case";

let inMemoryTestRepository: InMemoryTestRepository;
let testUseCase: TestUseCase;
let testFactory: TestFactory;

describe("Use case", () => {
	beforeEach(() => {
		inMemoryTestRepository = new InMemoryTestRepository();
		testUseCase = new TestUseCase(inMemoryTestRepository);
		testFactory = new TestFactory(inMemoryTestRepository);
	});

	it("should be able to create a test aggregate root", async () => {
		const testAggregateRoot = makeTest();

		const result = await testUseCase.execute({
			name: testAggregateRoot.name,
			email: testAggregateRoot.email,
			password: testAggregateRoot.password,
		});

		expect(result.isSuccess()).toBeTruthy();
		expect(inMemoryTestRepository.items).toHaveLength(1);
		expect(result.isSuccess() && result.value).toEqual({
			test: expect.objectContaining({
				name: testAggregateRoot.name,
				email: testAggregateRoot.email,
				password: testAggregateRoot.password,
			}),
		});
	});

	it("should not be able to create a test aggregate root with the same email", async () => {
		const testAggregateRoot = await testFactory.makeTest();

		const result = await testUseCase.execute({
			name: testAggregateRoot.name,
			email: testAggregateRoot.email,
			password: testAggregateRoot.password,
		});

		expect(result.isError()).toBeTruthy();
		expect(result.value).toBeInstanceOf(AlreadyExistsError);
	});
});
