import { AggregateRoot, Optional, UniqueEntityId } from "@pedrohb/core-ddd";
import { UserCreatedEvent } from "../events/user-created-event";
import { VerifyEmailEvent } from "../events/verify-email-event";
import { CPF } from "../value-objects/cpf";
import { UserAddress } from "./user-address";

export enum UserRole {
	CLIENT = "CLIENT",
	DELIVERYMAN = "DELIVERYMAN",
	ADMINISTRATOR = "ADMINISTRATOR",
}

export interface IUser {
	name: string;
	email: string;
	cpf: CPF;
	birthdate: Date;
	password: string;
	role: UserRole;
	emailVerifiedAt?: Date | null;
	createdAt: Date;
	updatedAt?: Date | null;
	address: UserAddress | null;
}

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

	get cpf() {
		return this.props.cpf;
	}

	set cpf(cpf: CPF) {
		this.props.cpf = cpf;

		this.update();
	}

	get birthdate() {
		return this.props.birthdate;
	}

	set birthdate(birthdate: Date) {
		this.props.birthdate = birthdate;

		this.update();
	}

	get password() {
		return this.props.password;
	}

	set password(password: string) {
		this.props.password = password;

		this.update();
	}

	get role() {
		return this.props.role;
	}

	set role(role: UserRole) {
		this.props.role = role;

		this.update();
	}

	get emailVerifiedAt() {
		return this.props.emailVerifiedAt;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get address() {
		return this.props.address;
	}

	set address(address: UserAddress | null) {
		this.props.address = address;

		this.update();
	}

	private update() {
		this.props.updatedAt = new Date();
	}

	public verifyEmail() {
		this.props.emailVerifiedAt = new Date();
	}

	public static create(
		props: Optional<IUser, "role" | "createdAt" | "address">,
		id?: UniqueEntityId,
	) {
		const user = new User(
			{
				...props,
				role: props.role ?? UserRole.CLIENT,
				createdAt: props.createdAt ?? new Date(),
				address: props.address ?? null,
			},
			id,
		);

		if (!id && !props.emailVerifiedAt) {
			user.addDomainEvent(new UserCreatedEvent(user));
			user.addDomainEvent(new VerifyEmailEvent(user));
		}

		return user;
	}
}
