import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository";
import {
	INotification,
	Notification,
} from "@/domain/notification/enterprise/entities/notification";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "@pedrohb/core-ddd";

export function makeNotification(
	props: Partial<INotification> = {},
	id?: UniqueEntityId,
) {
	const content = [
		{
			type: "p",
			children: [
				{
					text: faker.lorem.text(),
				},
			],
		},
	];

	const notification = Notification.create(
		{
			title: faker.lorem.sentence(),
			content: JSON.stringify(content),
			recipientId: new UniqueEntityId(),
			...props,
		},
		id,
	);

	return notification;
}

@Injectable()
export class NotificationFactory {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}

	public async makeNotification(
		props: Partial<INotification> = {},
		id?: UniqueEntityId,
	) {
		const notification = makeNotification(props, id);

		await this.notificationsRepository.create(notification);

		return notification;
	}
}
