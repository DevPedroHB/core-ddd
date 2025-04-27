import { UUID } from "@/entities/entity-ids/uuid";
import { fakerPT_BR as faker } from "@faker-js/faker";
import {
	type ITestAggregateRoot,
	TestAggregateRoot,
} from "@tests/entities/test-aggregate-root";
import type { TestRepository } from "@tests/repositories/test-repository";

export function makeTest(props: Partial<ITestAggregateRoot> = {}, id?: UUID) {
	const name = faker.person.fullName();

	const testAggregateRoot = TestAggregateRoot.create(
		{
			name,
			email: faker.internet.email({
				firstName: name.split(" ")[0],
				lastName: name.split(" ")[1],
			}),
			password: faker.internet.password(),
			...props,
		},
		id,
	);

	return testAggregateRoot;
}

export class TestFactory {
	constructor(private readonly testRepository: TestRepository) {}

	async makeTest(props: Partial<ITestAggregateRoot> = {}, id?: UUID) {
		const testAggregateRoot = makeTest(props, id);

		await this.testRepository.create(testAggregateRoot);

		return testAggregateRoot;
	}
}
