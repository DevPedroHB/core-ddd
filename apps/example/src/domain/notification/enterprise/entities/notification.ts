import { Entity, Optional, UniqueEntityId } from "@pedrohb/core-ddd";

export interface INotification {
	title: string;
	content: string;
	readAt?: Date | null;
	createdAt: Date;
	recipientId: UniqueEntityId;
}

export class Notification extends Entity<INotification> {
	get title() {
		return this.props.title;
	}

	get content() {
		return this.props.content;
	}

	get readAt() {
		return this.props.readAt;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get recipientId() {
		return this.props.recipientId;
	}

	public read() {
		this.props.readAt = new Date();
	}

	public static create(
		props: Optional<INotification, "createdAt">,
		id?: UniqueEntityId,
	) {
		const notification = new Notification(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return notification;
	}
}
