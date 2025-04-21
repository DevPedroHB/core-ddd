import { DomainEvent, UniqueEntityId } from "@pedrohb/core-ddd";
import { User } from "../entities/user";

export class UserCreatedEvent implements DomainEvent {
	public occurredAt: Date;
	private user: User;

	constructor(user: User) {
		this.occurredAt = new Date();
		this.user = user;
	}

	public getAggregateId(): UniqueEntityId {
		return this.user.id;
	}
}
