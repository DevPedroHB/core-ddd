import { generateCpf } from "@/core/functions/generate-cpf";
import {
	AlreadyExistsError,
	InvalidCredentialsError,
	NotAllowedError,
} from "@pedrohb/core-ddd";
import { FakeHasher } from "@test/cryptography/fake-hasher";
import { UserFactory, makeUser } from "@test/factories/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { addDays, subYears } from "date-fns";
import { SignUpUseCase } from "./sign-up";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let signUpUseCase: SignUpUseCase;
let userFactory: UserFactory;

describe("Sign up", () => {
	beforeEach(async () => {
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
			cpf: user.cpf.cpf,
			birthdate: user.birthdate,
			password: user.password,
		});

		expect(result.isSuccess()).toBeTruthy();
		expect(result.value).toEqual({
			user: expect.objectContaining({
				name: user.name,
				email: user.email,
				cpf: user.cpf,
				birthdate: user.birthdate,
				password: await fakeHasher.hash(user.password),
			}),
		});
	});

	it("should not be able to sign up with a after birthdate", async () => {
		const user = makeUser({
			birthdate: addDays(new Date(), 1),
		});

		const result = await signUpUseCase.execute({
			name: user.name,
			email: user.email,
			cpf: user.cpf.cpf,
			birthdate: user.birthdate,
			password: user.password,
		});

		expect(result.isError()).toBeTruthy();
		expect(result.value).toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be able to sign up if you are under 14", async () => {
		const user = makeUser({
			birthdate: subYears(new Date(), 13),
		});

		const result = await signUpUseCase.execute({
			name: user.name,
			email: user.email,
			cpf: user.cpf.cpf,
			birthdate: user.birthdate,
			password: user.password,
		});

		expect(result.isError()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});

	it("should not be able to sign up with invalid cpf", async () => {
		const user = makeUser();

		const result = await signUpUseCase.execute({
			name: user.name,
			email: user.email,
			cpf: "123.456.789-00",
			birthdate: user.birthdate,
			password: user.password,
		});

		expect(result.isError()).toBeTruthy();
		expect(result.value).toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be able to sign up with same cpf or email", async () => {
		const user = await userFactory.makeUser();

		const resultSameCpf = await signUpUseCase.execute({
			name: user.name,
			email: "email@example.com",
			cpf: user.cpf.cpf,
			birthdate: user.birthdate,
			password: user.password,
		});

		const resultSameEmail = await signUpUseCase.execute({
			name: user.name,
			email: user.email,
			cpf: generateCpf(),
			birthdate: user.birthdate,
			password: user.password,
		});

		expect(resultSameCpf.isError() && resultSameEmail.isError()).toBeTruthy();
		expect(resultSameCpf.value && resultSameEmail.value).toBeInstanceOf(
			AlreadyExistsError,
		);
	});
});
