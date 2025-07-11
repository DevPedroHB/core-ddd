import { DomainEvent, UUID } from "@pedrohb/core-ddd";
import { User } from "../entities/user";

export class VerifyEmailEvent implements DomainEvent<UUID> {
	public occurredAt: Date;
	private user: User;

	constructor(user: User) {
		this.occurredAt = new Date();
		this.user = user;
	}

	public getAggregateId() {
		return this.user.id;
	}
}
