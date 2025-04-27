import { UUID } from "@/entities/entity-ids/uuid";
import { Repository } from "@/repositories/repository";
import {
	ITestAggregateRoot,
	TestAggregateRoot,
} from "@tests/entities/test-aggregate-root";

export type TestAggregateRootFields = ITestAggregateRoot & {
	id: UUID;
};

export abstract class TestRepository extends Repository<
	TestAggregateRootFields,
	TestAggregateRoot
> {
	abstract findByName(name: string): Promise<TestAggregateRoot | null>;
}
