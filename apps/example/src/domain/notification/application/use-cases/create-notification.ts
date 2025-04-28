import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import {
	Either,
	InvalidCredentialsError,
	ResourceNotFoundError,
	UUID,
	UseCase,
	error,
	success,
} from "@pedrohb/core-ddd";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

export interface CreateNotificationUseCaseRequest {
	title: string;
	content: string;
	recipientId: string;
}

export type CreateNotificationUseCaseResponse = Either<
	InvalidCredentialsError | ResourceNotFoundError,
	{
		notification: Notification;
	}
>;

export class CreateNotificationUseCase
	implements
		UseCase<CreateNotificationUseCaseRequest, CreateNotificationUseCaseResponse>
{
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	public async execute({
		title,
		content,
		recipientId,
	}: CreateNotificationUseCaseRequest): Promise<CreateNotificationUseCaseResponse> {
		try {
			const contentParsed = JSON.parse(content);
			const uniqueRecipientId = UUID.create(recipientId);

			const recipient = await this.usersRepository.findByFields({
				id: uniqueRecipientId,
			});

			if (!recipient) {
				throw new ResourceNotFoundError();
			}

			const notification = Notification.create({
				title,
				content: JSON.stringify(contentParsed),
				recipientId: uniqueRecipientId,
			});

			await this.notificationsRepository.create(notification);

			return success({
				notification,
			});
		} catch (err) {
			if (err instanceof SyntaxError) {
				return error(new InvalidCredentialsError());
			}

			return error(err);
		}
	}
}
