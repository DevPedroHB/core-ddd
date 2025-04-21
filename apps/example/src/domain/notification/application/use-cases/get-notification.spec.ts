import { NotificationFactory } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetNotificationUseCase } from "./get-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let getNotificationUseCase: GetNotificationUseCase;
let notificationFactory: NotificationFactory;

describe("Get notification", () => {
	beforeEach(async () => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		getNotificationUseCase = new GetNotificationUseCase(
			inMemoryNotificationsRepository,
		);
		notificationFactory = new NotificationFactory(
			inMemoryNotificationsRepository,
		);
	});

	it("should be able to get notification", async () => {
		const notification = await notificationFactory.makeNotification();

		const result = await getNotificationUseCase.execute({
			id: notification.id.id,
		});

		expect(result.isSuccess()).toBeTruthy();

		if (result.isSuccess()) {
			expect(result.value.notification.id).toEqual(notification.id);
		}
	});
});
