import { ResourceNotFoundError } from "@pedrohb/core-ddd";
import { NotificationFactory } from "@test/factories/notification-factory";
import { UserFactory } from "@test/factories/user-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { FetchAllUserNotificationsUseCase } from "./fetch-all-user-notifications";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let fetchAllUserNotificationsUseCase: FetchAllUserNotificationsUseCase;
let userFactory: UserFactory;
let notificationFactory: NotificationFactory;

describe("Fetch all user notifications", () => {
	beforeEach(async () => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		inMemoryUsersRepository = new InMemoryUsersRepository();
		fetchAllUserNotificationsUseCase = new FetchAllUserNotificationsUseCase(
			inMemoryNotificationsRepository,
			inMemoryUsersRepository,
		);
		userFactory = new UserFactory(inMemoryUsersRepository);
		notificationFactory = new NotificationFactory(
			inMemoryNotificationsRepository,
		);
	});

	it("should be able to fetch all user notifications", async () => {
		const recipient = await userFactory.makeUser();

		for (let i = 0; i < 10; i++) {
			await notificationFactory.makeNotification({
				recipientId: recipient.id,
			});
		}

		const resultPage1 = await fetchAllUserNotificationsUseCase.execute({
			recipientId: recipient.id.uuid,
			page: 1,
			perPage: 5,
		});

		const resultPage2 = await fetchAllUserNotificationsUseCase.execute({
			recipientId: recipient.id.uuid,
			page: 2,
			perPage: 5,
		});

		expect(resultPage1.isSuccess()).toBeTruthy();
		expect(resultPage2.isSuccess()).toBeTruthy();

		if (resultPage1.isSuccess() && resultPage2.isSuccess()) {
			expect(resultPage1.value.notifications).toHaveLength(5);
			expect(resultPage2.value.notifications).toHaveLength(5);
		}
	});

	it("should not be able to read notification with not existing recipient", async () => {
		const notification = await notificationFactory.makeNotification();

		const result = await fetchAllUserNotificationsUseCase.execute({
			recipientId: notification.recipientId.uuid,
		});

		expect(result.isError()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});
});
