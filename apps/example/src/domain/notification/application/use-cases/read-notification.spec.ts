import { ResourceNotFoundError } from "@pedrohb/core-ddd";
import { NotificationFactory } from "@test/factories/notification-factory";
import { UserFactory } from "@test/factories/user-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { ReadNotificationUseCase } from "./read-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let readNotificationUseCase: ReadNotificationUseCase;
let userFactory: UserFactory;
let notificationFactory: NotificationFactory;

describe("Read notification", () => {
	beforeEach(async () => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		inMemoryUsersRepository = new InMemoryUsersRepository();
		readNotificationUseCase = new ReadNotificationUseCase(
			inMemoryNotificationsRepository,
			inMemoryUsersRepository,
		);
		userFactory = new UserFactory(inMemoryUsersRepository);
		notificationFactory = new NotificationFactory(
			inMemoryNotificationsRepository,
		);
	});

	it("should be able to read notification", async () => {
		const recipient = await userFactory.makeUser();
		const notification = await notificationFactory.makeNotification({
			recipientId: recipient.id,
		});

		const result = await readNotificationUseCase.execute({
			id: notification.id.id,
			recipientId: notification.recipientId.id,
		});

		const notificationOnDatabase = inMemoryNotificationsRepository.items[0];

		expect(result.isSuccess()).toBeTruthy();
		expect(notificationOnDatabase.readAt).toEqual(expect.any(Date));
	});

	it("should not be able to read notification with not existing recipient", async () => {
		const notification = await notificationFactory.makeNotification();

		const result = await readNotificationUseCase.execute({
			id: notification.id.id,
			recipientId: notification.recipientId.id,
		});

		expect(result.isError()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});
});
