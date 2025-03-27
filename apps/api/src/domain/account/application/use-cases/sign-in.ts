import {
	Either,
	InvalidCredentialsError,
	UseCase,
	error,
	success,
} from "@pedrohb/core-ddd";
import { User as UserTypes } from "@pedrohb/types";
import { User } from "../../enterprise/entities/user";
import { Encrypter } from "../cryptography/encrypter";
import { Hasher } from "../cryptography/hasher";
import { UsersRepository } from "../repositories/users-repository";

export interface SignInUseCaseRequest
	extends Pick<UserTypes, "email" | "password"> {}

export type SignInUseCaseResponse = Either<
	InvalidCredentialsError,
	{
		user: User;
		token: string;
	}
>;

export class SignInUseCase
	implements UseCase<SignInUseCaseRequest, SignInUseCaseResponse>
{
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly hasher: Hasher,
		private readonly encrypter: Encrypter,
	) {}

	public async execute({
		email,
		password,
	}: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
		const user = await this.usersRepository.findByFields({ email });

		if (!user) {
			return error(new InvalidCredentialsError());
		}

		const isPasswordValid = await this.hasher.compare(password, user.password);

		if (!isPasswordValid) {
			return error(new InvalidCredentialsError());
		}

		const token = await this.encrypter.encrypt({
			sub: user.id.id,
		});

		return success({
			user,
			token,
		});
	}
}
