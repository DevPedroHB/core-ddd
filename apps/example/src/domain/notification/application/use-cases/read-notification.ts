import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import {
	Either,
	ResourceNotFoundError,
	UniqueEntityId,
	UseCase,
	error,
	success,
} from "@pedrohb/core-ddd";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

export interface ReadNotificationUseCaseRequest {
	id: string;
	recipientId: string;
}

export type ReadNotificationUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		notification: Notification;
	}
>;

export class ReadNotificationUseCase
	implements
		UseCase<ReadNotificationUseCaseRequest, ReadNotificationUseCaseResponse>
{
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	public async execute({
		id,
		recipientId,
	}: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
		try {
			const recipient = await this.usersRepository.findByFields({
				id: new UniqueEntityId(recipientId),
			});

			if (!recipient) {
				throw new ResourceNotFoundError();
			}

			const notification = await this.notificationsRepository.findByFields({
				id: new UniqueEntityId(id),
			});

			if (!notification) {
				throw new ResourceNotFoundError();
			}

			notification.read();

			await this.notificationsRepository.update(notification);

			return success({
				notification,
			});
		} catch (err) {
			return error(err);
		}
	}
}
