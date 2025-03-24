import { Entity } from "@/entities/entity";
import type { UniqueEntityId } from "@/entities/unique-entity-id";
import type { Optional } from "@/types/optional";

export interface ITestEntity {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class TestEntity extends Entity<ITestEntity> {
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

	public static create(
		props: Optional<ITestEntity, "createdAt">,
		id?: UniqueEntityId,
	) {
		const testEntity = new TestEntity(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return testEntity;
	}
}
