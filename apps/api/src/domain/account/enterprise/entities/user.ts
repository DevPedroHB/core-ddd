import {
	AggregateRoot,
	NullableToOptional,
	Optional,
	UniqueEntityId,
} from "@pedrohb/core-ddd";
import { User as UserDatabase } from "@pedrohb/database";
import { UserCreatedEvent } from "../events/user-created-event";

export interface IUser extends NullableToOptional<Omit<UserDatabase, "id">> {}

export class User extends AggregateRoot<IUser> {
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

		if (!id) {
			user.addDomainEvent(new UserCreatedEvent(user));
		}

		return user;
	}
}
