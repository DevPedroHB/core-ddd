import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import {
	IUser,
	User,
	UserRole,
} from "@/domain/account/enterprise/entities/user";
import { UserAddress } from "@/domain/account/enterprise/entities/user-address";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { CPF, UUID } from "@pedrohb/core-ddd";

export function makeUser(props: Partial<IUser> = {}, id?: UUID) {
	const name = faker.person.fullName();

	const user = User.create(
		{
			name,
			email: faker.internet.email({
				firstName: name.split(" ")[0],
				lastName: name.split(" ")[1],
				allowSpecialCharacters: true,
			}),
			cpf: CPF.create(CPF.generate()),
			birthdate: faker.date.birthdate(),
			password: faker.internet.password(),
			role: faker.helpers.enumValue(UserRole),
			...props,
		},
		id,
	);

	const userAddress = UserAddress.create({
		zipCode: faker.location.zipCode(),
		state: faker.location.state(),
		city: faker.location.city(),
		neighborhood: faker.location.country(),
		street: faker.location.street(),
		number: Number(faker.location.buildingNumber()),
		latitude: faker.location.latitude(),
		longitude: faker.location.longitude(),
		userId: user.id,
	});

	user.address = userAddress;

	return user;
}

@Injectable()
export class UserFactory {
	constructor(private readonly usersRepository: UsersRepository) {}

	public async makeUser(props: Partial<IUser> = {}, id?: UUID) {
		const user = makeUser(props, id);

		await this.usersRepository.create(user);

		return user;
	}
}
