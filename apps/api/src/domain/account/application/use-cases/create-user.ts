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
import { UserRepository } from "../repositories/user-repository";

export type CreateUserUseCaseRequest = Pick<
	UserTypes,
	"name" | "email" | "password"
>;

export type CreateUserUseCaseResponse = Either<
	AlreadyExistsError,
	{
		user: User;
	}
>;

export class CreateUserUseCase
	implements UseCase<CreateUserUseCaseRequest, CreateUserUseCaseResponse>
{
	constructor(
		private readonly userRepository: UserRepository,
		private readonly hasher: Hasher,
	) {}

	public async execute({
		name,
		email,
		password,
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		const userWithSameEmail = await this.userRepository.findByFields({ email });

		if (userWithSameEmail) {
			return error(new AlreadyExistsError("O usuário"));
		}

		const hashedPassword = await this.hasher.hash(password);

		const user = User.create({
			name,
			email,
			password: hashedPassword,
		});

		await this.userRepository.create(user);

		return success({
			user,
		});
	}
}
