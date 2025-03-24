import { DomainEvents } from "@/events/domain-events";
import { jest } from "@jest/globals";
import { TestAggregateRoot } from "@tests/entities/test-aggregate-root";
import { TestAggregateRootEvent } from "@tests/events/test-aggregate-root-event";

let testAggregateRoot: TestAggregateRoot;

describe("Aggregate root", () => {
	beforeEach(() => {
		testAggregateRoot = TestAggregateRoot.create({
			name: "John Doe",
			email: "example@email.com",
			password: "PSW@p4ssw0rd",
		});
	});

	it("should be able to create a aggregate root", () => {
		expect(testAggregateRoot.domainEvents).toHaveLength(1);
		expect(testAggregateRoot.domainEvents[0]).toBeInstanceOf(
			TestAggregateRootEvent,
		);
	});

	it("should be able to clear domain events after dispatching", () => {
		DomainEvents.dispatchEventsForAggregate(testAggregateRoot.id);

		expect(testAggregateRoot.domainEvents).toHaveLength(0);
	});

	it("should be able to dispatch and listen to domain events", async () => {
		const callbackSpy = jest.fn();

		DomainEvents.register(callbackSpy, TestAggregateRootEvent.name);

		expect(testAggregateRoot.domainEvents).toHaveLength(1);

		DomainEvents.dispatchEventsForAggregate(testAggregateRoot.id);

		expect(callbackSpy).toHaveBeenCalled();
		expect(callbackSpy).toHaveBeenCalledWith(
			expect.any(TestAggregateRootEvent),
		);
		expect(testAggregateRoot.domainEvents).toHaveLength(0);
	});
});
