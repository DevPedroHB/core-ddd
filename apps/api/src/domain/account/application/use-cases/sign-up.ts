import {
	AlreadyExistsError,
	Either,
	UseCase,
	error,
	success,
} from "@pedrohb/core-ddd";
import { User as UserTypes } from "@pedrohb/types";
import { User } from "../../enterprise/entities/user";
import { Hasher } from "../cryptography/hasher";
import { UsersRepository } from "../repositories/users-repository";

export type SignUpUseCaseRequest = Pick<
	UserTypes,
	"name" | "email" | "password"
>;

export type SignUpUseCaseResponse = Either<
	AlreadyExistsError,
	{
		user: User;
	}
>;

export class SignUpUseCase
	implements UseCase<SignUpUseCaseRequest, SignUpUseCaseResponse>
{
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly hasher: Hasher,
	) {}

	public async execute({
		name,
		email,
		password,
	}: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
		const userWithSameEmail = await this.usersRepository.findByFields({
			email,
		});

		if (userWithSameEmail) {
			return error(new AlreadyExistsError("O usuário"));
		}

		const hashedPassword = await this.hasher.hash(password);

		const user = User.create({
			name,
			email,
			password: hashedPassword,
		});

		await this.usersRepository.create(user);

		return success({
			user,
		});
	}
}
