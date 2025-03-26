import { Repository } from "@/repositories/repository";
import { EntityWithId } from "@/types/entity-with-id";
import {
	ITestAggregateRoot,
	TestAggregateRoot,
} from "@tests/entities/test-aggregate-root";

export type TestAggregateRootFields = EntityWithId<ITestAggregateRoot>;

export abstract class TestRepository extends Repository<
	TestAggregateRootFields,
	TestAggregateRoot
> {
	abstract findByName(name: string): Promise<TestAggregateRoot | null>;
}
