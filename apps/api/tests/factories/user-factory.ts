import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import { IUser, User } from "@/domain/account/enterprise/entities/user";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { UniqueEntityId } from "@pedrohb/core-ddd";

export function makeUser(props: Partial<IUser> = {}, id?: UniqueEntityId) {
	const name = faker.person.fullName();

	const user = User.create(
		{
			name,
			email: faker.internet.email({
				firstName: name.split(" ")[0],
				lastName: name.split(" ")[1],
			}),
			password: faker.internet.password(),
			...props,
		},
		id,
	);

	return user;
}

export class UserFactory {
	constructor(private readonly usersRepository: UsersRepository) {}

	public async makeUser(props: Partial<IUser> = {}, id?: UniqueEntityId) {
		const user = makeUser(props, id);

		await this.usersRepository.create(user);

		return user;
	}
}
