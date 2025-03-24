import type { DomainEvent } from "@/interfaces/domain-event";
import type { TestAggregateRoot } from "@tests/entities/test-aggregate-root";

export class TestAggregateRootEvent implements DomainEvent {
	public occurredAt: Date;
	private aggregate: TestAggregateRoot;

	constructor(aggregate: TestAggregateRoot) {
		this.occurredAt = new Date();
		this.aggregate = aggregate;
	}

	public getAggregateId() {
		return this.aggregate.id;
	}
}
