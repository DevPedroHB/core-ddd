import { type Either, error, success } from "@/common/either";
import { AlreadyExistsError } from "@/errors/already-exists-error";
import type { UseCase } from "@/use-cases/use-case";
import {
	type ITestAggregateRoot,
	TestAggregateRoot,
} from "@tests/entities/test-aggregate-root";
import type { TestRepository } from "@tests/repositories/test-repository";
import { injectable } from "inversify";

export type TestUseCaseRequest = Pick<
	ITestAggregateRoot,
	"name" | "email" | "password"
>;

export type TestUseCaseResponse = Either<
	AlreadyExistsError,
	{
		test: TestAggregateRoot;
	}
>;

@injectable()
export class TestUseCase
	implements UseCase<TestUseCaseRequest, TestUseCaseResponse>
{
	constructor(private readonly testRepository: TestRepository) {}

	async execute({
		name,
		email,
		password,
	}: TestUseCaseRequest): Promise<TestUseCaseResponse> {
		const testWithSameEmail = await this.testRepository.findByFields({ email });

		if (testWithSameEmail) {
			return error(new AlreadyExistsError("O usuário"));
		}

		const test = TestAggregateRoot.create({
			name,
			email,
			password,
		});

		return success({
			test,
		});
	}
}
