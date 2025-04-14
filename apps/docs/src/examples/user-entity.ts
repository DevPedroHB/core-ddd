import { Entity, Optional, UniqueEntityId } from "@pedrohb/core-ddd";

export interface IUser {
	name: string;
	email: string;
	password: string;
	updatedAt?: Date | null;
	createdAt: Date;
}

export class User extends Entity<IUser> {
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

	get updatedAt() {
		return this.props.updatedAt;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	private update() {
		this.props.updatedAt = new Date();
	}

	public static create(
		props: Optional<IUser, "createdAt">,
		id?: UniqueEntityId,
	) {
		const user = new User(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return user;
	}
}
