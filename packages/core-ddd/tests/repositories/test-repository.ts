import { Repository } from "@/repositories/repository";
import type { EntityTypeWithId } from "@/types/entity-type-with-id";
import type {
	ITestAggregateRoot,
	TestAggregateRoot,
} from "@tests/entities/test-aggregate-root";

export type TestAggregateRootType = EntityTypeWithId<ITestAggregateRoot>;

export abstract class TestRepository extends Repository<
	TestAggregateRootType,
	TestAggregateRoot
> {
	abstract findByName(name: string): Promise<TestAggregateRoot | null>;
}
