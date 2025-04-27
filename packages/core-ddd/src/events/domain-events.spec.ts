import { UUID } from "@/entities/entity-ids/uuid";
import { TestAggregateRoot } from "@tests/entities/test-aggregate-root";
import { TestAggregateRootEvent } from "@tests/events/test-aggregate-root-event";
import { DomainEvents } from "./domain-events";

let testAggregateRoot: TestAggregateRoot;

describe("Domain events", () => {
	beforeEach(() => {
		DomainEvents.shouldRun = true;
		DomainEvents.clearHandlers();
		DomainEvents.clearMarkedAggregates();

		jest.spyOn(DomainEvents, "markAggregateForDispatch");

		testAggregateRoot = TestAggregateRoot.create({
			name: "John Doe",
			email: "example@email.com",
			password: "PSW@p4ssw0rd",
		});
	});

	afterEach(() => {
		DomainEvents.clearHandlers();
		DomainEvents.clearMarkedAggregates();

		jest.restoreAllMocks();
	});

	it("should be able to register and trigger an event handler", () => {
		const callbackSpy = jest.fn();

		DomainEvents.register(callbackSpy, "TestAggregateRootEvent");

		DomainEvents.dispatchEventsForAggregate(testAggregateRoot.id);

		expect(callbackSpy).toHaveBeenCalledTimes(1);
		expect(callbackSpy).toHaveBeenCalledWith(
			expect.any(TestAggregateRootEvent),
		);
	});

	it("should net be able to trigger event handlers when DomainEvents.shouldRun is false", () => {
		const callbackSpy = jest.fn();

		DomainEvents.register(callbackSpy, "TestAggregateRootEvent");

		DomainEvents.shouldRun = false;

		DomainEvents.dispatchEventsForAggregate(testAggregateRoot.id);

		expect(callbackSpy).not.toHaveBeenCalled();
	});

	it("should be able to clear domain events after dispatching", () => {
		const spyOnClearEvents = jest.spyOn(testAggregateRoot, "clearEvents");

		expect(testAggregateRoot.domainEvents).toHaveLength(1);

		DomainEvents.dispatchEventsForAggregate(testAggregateRoot.id);

		expect(spyOnClearEvents).toHaveBeenCalledTimes(1);
		expect(testAggregateRoot.domainEvents).toHaveLength(0);
	});

	it("should be able to mark aggregate for dispatch when an event is added", () => {
		jest.clearAllMocks();

		testAggregateRoot.addNewDomainEvent();

		expect(DomainEvents.markAggregateForDispatch).toHaveBeenCalledTimes(1);
		expect(DomainEvents.markAggregateForDispatch).toHaveBeenCalledWith(
			testAggregateRoot,
		);
	});

	it("should not be able to dispatch events for non-existing aggregate", () => {
		const callbackSpy = jest.fn();

		DomainEvents.register(callbackSpy, "TestAggregateRootEvent");

		const nonExistingAggregateId = UUID.create(UUID.generate());

		DomainEvents.dispatchEventsForAggregate(nonExistingAggregateId);

		expect(callbackSpy).not.toHaveBeenCalled();
	});

	it("should be able to register multiple handlers for the same event", () => {
		const firstCallbackSpy = jest.fn();
		const secondCallbackSpy = jest.fn();

		DomainEvents.register(firstCallbackSpy, "TestAggregateRootEvent");
		DomainEvents.register(secondCallbackSpy, "TestAggregateRootEvent");

		DomainEvents.dispatchEventsForAggregate(testAggregateRoot.id);

		expect(firstCallbackSpy).toHaveBeenCalledTimes(1);
		expect(secondCallbackSpy).toHaveBeenCalledTimes(1);
	});

	it("should be able to only dispatch events for handlers that match the event name", () => {
		const matchingHandlerSpy = jest.fn();
		const nonMatchingHandlerSpy = jest.fn();

		DomainEvents.register(matchingHandlerSpy, "TestAggregateRootEvent");
		DomainEvents.register(nonMatchingHandlerSpy, "SomeOtherEvent");

		DomainEvents.dispatchEventsForAggregate(testAggregateRoot.id);

		expect(matchingHandlerSpy).toHaveBeenCalledTimes(1);
		expect(nonMatchingHandlerSpy).not.toHaveBeenCalled();
	});

	it("should be able to dispatch multiple events from the same aggregate", () => {
		const callbackSpy = jest.fn();

		DomainEvents.register(callbackSpy, "TestAggregateRootEvent");

		testAggregateRoot.addNewDomainEvent();
		testAggregateRoot.addNewDomainEvent();

		expect(testAggregateRoot.domainEvents).toHaveLength(3);

		DomainEvents.dispatchEventsForAggregate(testAggregateRoot.id);

		expect(callbackSpy).toHaveBeenCalledTimes(3);
	});

	it("should be able to clear all handlers when clearHandlers is called", () => {
		const callbackSpy = jest.fn();

		DomainEvents.register(callbackSpy, "TestAggregateRootEvent");

		DomainEvents.clearHandlers();

		DomainEvents.dispatchEventsForAggregate(testAggregateRoot.id);

		expect(callbackSpy).not.toHaveBeenCalled();
	});
});
