import { User, UserRole } from "@/domain/account/enterprise/entities/user";
import { CPF } from "@/domain/account/enterprise/value-objects/cpf";
import { UniqueEntityId } from "@pedrohb/core-ddd";
import {
	Prisma,
	User as PrismaUser,
	UserRole as PrismaUserRole,
} from "@pedrohb/database";

export class PrismaUserMapper {
	public static toDomain(user: PrismaUser): User {
		return User.create(
			{
				name: user.name,
				email: user.email,
				cpf: CPF.create(user.cpf),
				birthdate: user.birthdate,
				password: user.password,
				role: UserRole[user.role],
				emailVerifiedAt: user.emailVerifiedAt,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
			new UniqueEntityId(user.id),
		);
	}

	public static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
		return {
			id: user.id.id,
			name: user.name,
			email: user.email,
			cpf: user.cpf.cpf,
			birthdate: user.birthdate,
			password: user.password,
			role: PrismaUserRole[user.role],
			emailVerifiedAt: user.emailVerifiedAt,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}
}
