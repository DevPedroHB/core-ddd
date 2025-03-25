import { ValueObject } from "@/entities/value-object";
import type { Optional } from "@/types/optional";

export interface ITestValueObject {
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt?: Date | null;
}

export class TestValueObject extends ValueObject<ITestValueObject> {
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

	public static create(props: Optional<ITestValueObject, "createdAt">) {
		const testValueObject = new TestValueObject({
			...props,
			createdAt: props.createdAt ?? new Date(),
		});

		return testValueObject;
	}
}
