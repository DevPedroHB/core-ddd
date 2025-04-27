import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { UniqueEntityId } from "@pedrohb/core-ddd";
import { Prisma, Notification as PrismaNotification } from "@pedrohb/database";

export class PrismaNotificationMapper {
	public static toDomain(notification: PrismaNotification): Notification {
		return Notification.create(
			{
				title: notification.title,
				content: JSON.stringify(notification.content),
				readAt: notification.readAt,
				createdAt: notification.createdAt,
				recipientId: new UniqueEntityId(notification.recipientId),
			},
			new UniqueEntityId(notification.id),
		);
	}

	public static toPrisma(
		notification: Notification,
	): Prisma.NotificationUncheckedCreateInput {
		return {
			id: notification.id.id,
			title: notification.title,
			content: JSON.parse(notification.content),
			readAt: notification.readAt,
			createdAt: notification.createdAt,
			recipientId: notification.recipientId.id,
		};
	}
}
