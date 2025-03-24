import type { UniqueEntityId } from "@/entities/unique-entity-id";

export interface DomainEvent {
	readonly occurredAt: Date;
	getAggregateId(): UniqueEntityId;
}
