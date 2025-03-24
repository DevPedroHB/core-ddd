import { DomainEvents } from "@/events/domain-events";
import type { DomainEvent } from "@/interfaces/domain-event";
import { Entity } from "./entity";

export abstract class AggregateRoot<T> extends Entity<T> {
	private _domainEvents: Set<DomainEvent> = new Set();

	get domainEvents() {
		return Array.from(this._domainEvents);
	}

	protected addDomainEvent(domainEvent: DomainEvent) {
		this._domainEvents.add(domainEvent);

		DomainEvents.markAggregateForDispatch(this);
	}

	public clearEvents() {
		this._domainEvents.clear();
	}
}
