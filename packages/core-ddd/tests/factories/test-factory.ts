import type { UniqueEntityId } from "@/entities/unique-entity-id";
import { fakerPT_BR as faker } from "@faker-js/faker";
import {
	type ITestAggregateRoot,
	TestAggregateRoot,
} from "@tests/entities/test-aggregate-root";
import type { TestRepository } from "@tests/repositories/test-repository";
import { injectable } from "inversify";

export function makeUser(
	props: Partial<ITestAggregateRoot> = {},
	id?: UniqueEntityId,
) {
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

@injectable()
export class UserFactory {
	constructor(private readonly testRepository: TestRepository) {}

	async makeUser(props: Partial<ITestAggregateRoot> = {}, id?: UniqueEntityId) {
		const testAggregateRoot = makeUser(props, id);

		await this.testRepository.create(testAggregateRoot);

		return testAggregateRoot;
	}
}
