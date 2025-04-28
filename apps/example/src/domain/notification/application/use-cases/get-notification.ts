import {
	Either,
	ResourceNotFoundError,
	UUID,
	UseCase,
	error,
	success,
} from "@pedrohb/core-ddd";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

export interface GetNotificationUseCaseRequest {
	id: string;
}

export type GetNotificationUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		notification: Notification;
	}
>;

export class GetNotificationUseCase
	implements
		UseCase<GetNotificationUseCaseRequest, GetNotificationUseCaseResponse>
{
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}

	public async execute({
		id,
	}: GetNotificationUseCaseRequest): Promise<GetNotificationUseCaseResponse> {
		try {
			const notification = await this.notificationsRepository.findByFields({
				id: UUID.create(id),
			});

			if (!notification) {
				throw new ResourceNotFoundError();
			}

			return success({
				notification,
			});
		} catch (err) {
			return error(err);
		}
	}
}
