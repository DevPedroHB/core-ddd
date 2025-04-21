import { User } from "@/domain/account/enterprise/entities/user";
import {
	InvalidCredentialsError,
	ResourceNotFoundError,
} from "@pedrohb/core-ddd";
import { makeNotification } from "@test/factories/notification-factory";
import { UserFactory } from "@test/factories/user-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { CreateNotificationUseCase } from "./create-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createNotificationUseCase: CreateNotificationUseCase;
let userFactory: UserFactory;
let recipient: User;

describe("Create notification", () => {
	beforeEach(async () => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		inMemoryUsersRepository = new InMemoryUsersRepository();
		createNotificationUseCase = new CreateNotificationUseCase(
			inMemoryNotificationsRepository,
			inMemoryUsersRepository,
		);
		userFactory = new UserFactory(inMemoryUsersRepository);

		recipient = await userFactory.makeUser();
	});

	it("should be able to create notification", async () => {
		const notification = makeNotification({
			recipientId: recipient.id,
		});

		const result = await createNotificationUseCase.execute({
			title: notification.title,
			content: notification.content,
			recipientId: notification.recipientId.id,
		});

		expect(result.isSuccess()).toBeTruthy();
		expect(inMemoryNotificationsRepository.items).toHaveLength(1);
	});

	it("should not be able to create notification with invalid content", async () => {
		const notification = makeNotification({
			recipientId: recipient.id,
		});

		const result = await createNotificationUseCase.execute({
			title: notification.title,
			content: "An invalid content",
			recipientId: notification.recipientId.id,
		});

		expect(result.isError()).toBeTruthy();
		expect(result.value).toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be able to create notification with not existing recipient", async () => {
		const notification = makeNotification();

		const result = await createNotificationUseCase.execute({
			title: notification.title,
			content: notification.content,
			recipientId: notification.recipientId.id,
		});

		expect(result.isError()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});
});
