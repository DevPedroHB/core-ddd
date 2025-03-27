import { AlreadyExistsError } from "@pedrohb/core-ddd";
import { FakeHasher } from "@tests/cryptography/fake-hasher";
import { UserFactory, makeUser } from "@tests/factories/user-factory";
import { InMemoryUsersRepository } from "@tests/repositories/in-memory-users-repository";
import { SignUpUseCase } from "./sign-up";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let signUpUseCase: SignUpUseCase;
let userFactory: UserFactory;

describe("Sign up", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		fakeHasher = new FakeHasher();
		signUpUseCase = new SignUpUseCase(inMemoryUsersRepository, fakeHasher);
		userFactory = new UserFactory(inMemoryUsersRepository);
	});

	it("should be able to sign up", async () => {
		const user = makeUser();

		const result = await signUpUseCase.execute({
			name: user.name,
			email: user.email,
			password: user.password,
		});

		expect(result.isSuccess()).toBeTruthy();
		expect(inMemoryUsersRepository.items).toHaveLength(1);
		expect(result.value).toEqual({
			user: expect.objectContaining({
				name: user.name,
				email: user.email,
				password: await fakeHasher.hash(user.password),
			}),
		});
	});

	it("should not be able to sign up with the same email", async () => {
		const user = await userFactory.makeUser();

		const result = await signUpUseCase.execute({
			name: user.name,
			email: user.email,
			password: user.password,
		});

		expect(result.isError()).toBeTruthy();
		expect(inMemoryUsersRepository.items).toHaveLength(0);
		expect(result.value).toBeInstanceOf(AlreadyExistsError);
	});
});
