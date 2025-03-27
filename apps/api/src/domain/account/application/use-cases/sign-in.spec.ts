import { InvalidCredentialsError } from "@pedrohb/core-ddd";
import { FakeEncrypter } from "@tests/cryptography/fake-encrypter";
import { FakeHasher } from "@tests/cryptography/fake-hasher";
import { UserFactory } from "@tests/factories/user-factory";
import { InMemoryUsersRepository } from "@tests/repositories/in-memory-users-repository";
import { User } from "../../enterprise/entities/user";
import { SignInUseCase } from "./sign-in";

const password = "PSW@p4ssw0rd";
let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let signInUseCase: SignInUseCase;
let userFactory: UserFactory;
let user: User;

describe("Sign in", () => {
	beforeEach(async () => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		fakeHasher = new FakeHasher();
		fakeEncrypter = new FakeEncrypter();
		signInUseCase = new SignInUseCase(
			inMemoryUsersRepository,
			fakeHasher,
			fakeEncrypter,
		);
		userFactory = new UserFactory(inMemoryUsersRepository);

		user = await userFactory.makeUser({
			password: await fakeHasher.hash(password),
		});
	});

	it("should be able to sign in", async () => {
		const result = await signInUseCase.execute({
			email: user.email,
			password,
		});

		expect(result.isSuccess()).toBeTruthy();
		expect(result.value).toEqual({
			user: expect.objectContaining({
				email: user.email,
				password: user.password,
			}),
			token: expect.any(String),
		});
	});

	it("should not be able to sign in with invalid credentials", async () => {
		const result = await signInUseCase.execute({
			email: user.email,
			password: "invalid-password",
		});

		expect(result.isError()).toBeTruthy();
		expect(result.value).toBeInstanceOf(InvalidCredentialsError);
	});
});
