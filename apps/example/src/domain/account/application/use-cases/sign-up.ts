import {
	AlreadyExistsError,
	CPF,
	Either,
	Hasher,
	InvalidCredentialsError,
	NotAllowedError,
	UseCase,
	error,
	success,
} from "@pedrohb/core-ddd";
import { differenceInYears, isAfter } from "date-fns";
import { User } from "../../enterprise/entities/user";
import { UsersRepository } from "../repositories/users-repository";

export interface SignUpUseCaseRequest {
	name: string;
	email: string;
	cpf: string;
	birthdate: Date;
	password: string;
}

export type SignUpUseCaseResponse = Either<
	InvalidCredentialsError | NotAllowedError | AlreadyExistsError,
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
		cpf,
		birthdate,
		password,
	}: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
		try {
			const currentDate = new Date();

			if (isAfter(birthdate, currentDate)) {
				throw new InvalidCredentialsError();
			}

			const age = differenceInYears(currentDate, birthdate);

			if (age < 14) {
				throw new NotAllowedError();
			}

			const cpfValidated = CPF.create(cpf);

			const userWithSameCPF = await this.usersRepository.findByFields({
				cpf: cpfValidated,
			});

			if (userWithSameCPF) {
				throw new AlreadyExistsError();
			}

			const userWithSameEmail = await this.usersRepository.findByFields({
				email,
			});

			if (userWithSameEmail) {
				throw new AlreadyExistsError();
			}

			const hashedPassword = await this.hasher.hash(password);

			const user = User.create({
				name,
				email,
				cpf: cpfValidated,
				birthdate,
				password: hashedPassword,
			});

			await this.usersRepository.create(user);

			return success({
				user,
			});
		} catch (err) {
			return error(err);
		}
	}
}
