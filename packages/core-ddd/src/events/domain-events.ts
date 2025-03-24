import type { AggregateRoot } from "@/entities/aggregate-root";
import type { UniqueEntityId } from "@/entities/unique-entity-id";
import type { DomainEvent } from "@/interfaces/domain-event";

type DomainEventCallback<T extends DomainEvent> = (event: T) => void;

export class DomainEvents {
	private static handlersMap: Record<
		string,
		DomainEventCallback<DomainEvent>[]
	> = {};
	private static markedAggregates: Set<AggregateRoot<unknown>> = new Set();
	public static shouldRun = true;

	public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
		const aggregateFound = !!DomainEvents.findMarkedAggregateByID(aggregate.id);

		if (!aggregateFound) {
			DomainEvents.markedAggregates.add(aggregate);
		}
	}

	public static dispatchEventsForAggregate(id: UniqueEntityId) {
		const aggregate = DomainEvents.findMarkedAggregateByID(id);

		if (aggregate) {
			DomainEvents.dispatchAggregateEvents(aggregate);

			aggregate.clearEvents();

			DomainEvents.removeAggregateFromMarkedDispatchList(aggregate);
		}
	}

	public static register(
		callback: DomainEventCallback<DomainEvent>,
		eventName: string,
	) {
		const wasEventRegisteredBefore = eventName in DomainEvents.handlersMap;

		if (!wasEventRegisteredBefore) {
			DomainEvents.handlersMap[eventName] = [];
		}

		DomainEvents.handlersMap[eventName].push(callback);
	}

	public static clearHandlers() {
		DomainEvents.handlersMap = {};
	}

	public static clearMarkedAggregates() {
		DomainEvents.markedAggregates.clear();
	}

	private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
		for (const event of aggregate.domainEvents) {
			DomainEvents.dispatch(event);
		}
	}

	private static removeAggregateFromMarkedDispatchList(
		aggregate: AggregateRoot<unknown>,
	) {
		DomainEvents.markedAggregates.delete(aggregate);
	}

	private static findMarkedAggregateByID(
		id: UniqueEntityId,
	): AggregateRoot<unknown> | undefined {
		for (const aggregate of DomainEvents.markedAggregates) {
			if (aggregate.id.equals(id)) {
				return aggregate;
			}
		}

		return undefined;
	}

	private static dispatch(event: DomainEvent) {
		if (!DomainEvents.shouldRun) {
			return;
		}

		const eventClassName = event.constructor.name;

		if (eventClassName in DomainEvents.handlersMap) {
			const handlers = DomainEvents.handlersMap[eventClassName];

			for (const handler of handlers) {
				handler(event);
			}
		}
	}
}
