import { Repository } from "@/repositories/repository";
import type { TestAggregateRoot } from "@tests/entities/test-aggregate-root";

export abstract class TestRepository extends Repository<TestAggregateRoot> {
	abstract findByName(name: string): Promise<TestAggregateRoot | null>;
}
