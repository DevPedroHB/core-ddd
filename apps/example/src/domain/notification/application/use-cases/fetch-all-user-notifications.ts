import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import {
	Either,
	Pagination,
	ResourceNotFoundError,
	UUID,
	UseCase,
	error,
	success,
} from "@pedrohb/core-ddd";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

export interface FetchAllUserNotificationsUseCaseRequest
	extends Partial<Pagination> {
	recipientId: string;
}

export type FetchAllUserNotificationsUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		notifications: Notification[];
	}
>;

export class FetchAllUserNotificationsUseCase
	implements
		UseCase<
			FetchAllUserNotificationsUseCaseRequest,
			FetchAllUserNotificationsUseCaseResponse
		>
{
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
		private readonly usersRepository: UsersRepository,
	) {}

	public async execute({
		recipientId,
		page = 1,
		perPage = 10,
	}: FetchAllUserNotificationsUseCaseRequest): Promise<FetchAllUserNotificationsUseCaseResponse> {
		try {
			const recipient = await this.usersRepository.findByFields({
				id: UUID.create(recipientId),
			});

			if (!recipient) {
				throw new ResourceNotFoundError();
			}

			const notifications = await this.notificationsRepository.fetchAll({
				fields: {
					recipientId: UUID.create(recipientId),
				},
				orderBy: {
					createdAt: "desc",
				},
				pagination: {
					page,
					perPage,
				},
			});

			return success({
				notifications,
			});
		} catch (err) {
			return error(err);
		}
	}
}
