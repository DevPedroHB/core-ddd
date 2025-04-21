import { waitFor } from "@pedrohb/core-ddd";
import { UserFactory } from "@test/factories/user-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { CreateNotificationUseCase } from "../use-cases/create-notification";
import { OnUserCreatedSubscriber } from "./on-user-created-subscriber";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let createNotificationUseCase: CreateNotificationUseCase;
let userFactory: UserFactory;

let createNotificationUseCaseExecuteSpy: jest.SpyInstance;

describe("On user created subscriber", () => {
	beforeEach(async () => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		createNotificationUseCase = new CreateNotificationUseCase(
			inMemoryNotificationsRepository,
			inMemoryUsersRepository,
		);
		userFactory = new UserFactory(inMemoryUsersRepository);

		createNotificationUseCaseExecuteSpy = jest.spyOn(
			createNotificationUseCase,
			"execute",
		);

		new OnUserCreatedSubscriber(
			inMemoryUsersRepository,
			createNotificationUseCase,
		);
	});

	it("should be able to send a notification when a user is created", async () => {
		await userFactory.makeUser();

		await waitFor(() => {
			expect(createNotificationUseCaseExecuteSpy).toHaveBeenCalled();
		});

		expect(inMemoryNotificationsRepository.items).toHaveLength(1);
	});
});
