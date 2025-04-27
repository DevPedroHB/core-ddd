import { AggregateRoot } from "@/entities/aggregate-root";
import { UUID } from "@/entities/entity-ids/uuid";
import type { Optional } from "@/types/optional";
import { TestAggregateRootEvent } from "@tests/events/test-aggregate-root-event";

export interface ITestAggregateRoot {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class TestAggregateRoot extends AggregateRoot<ITestAggregateRoot, UUID> {
	get name() {
		return this.props.name;
	}

	set name(name: string) {
		this.props.name = name;

		this.update();
	}

	get email() {
		return this.props.email;
	}

	set email(email: string) {
		this.props.email = email;

		this.update();
	}

	get password() {
		return this.props.password;
	}

	set password(password: string) {
		this.props.password = password;

		this.update();
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	private update() {
		this.props.updatedAt = new Date();
	}

	public addNewDomainEvent() {
		this.addDomainEvent(new TestAggregateRootEvent(this));
	}

	public static create(
		props: Optional<ITestAggregateRoot, "createdAt">,
		id?: UUID,
	) {
		const testAggregateRoot = new TestAggregateRoot(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id ?? UUID.create(UUID.generate()),
		);

		if (!id) {
			testAggregateRoot.addDomainEvent(
				new TestAggregateRootEvent(testAggregateRoot),
			);
		}

		return testAggregateRoot;
	}
}
