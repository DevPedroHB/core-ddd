import {
	UserFields,
	UsersRepository,
} from "@/domain/account/application/repositories/users-repository";
import { User } from "@/domain/account/enterprise/entities/user";
import {
	CacheRepository,
	DomainEvents,
	FetchAllOptions,
	FindByFields,
} from "@pedrohb/core-ddd";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { PrismaService } from "../prisma.service";

export class PrismaUsersRepository implements UsersRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly cache: CacheRepository,
	) {}

	public async fetchAll(
		options?: FetchAllOptions<UserFields>,
	): Promise<User[]> {
		const skip =
			options?.pagination &&
			(options.pagination.page - 1) * options.pagination.perPage;

		const users = await this.prisma.user.findMany({
			where: {
				...options?.fields,
				id: options?.fields?.id?.id,
				cpf: options?.fields?.cpf?.cpf,
			},
			orderBy: options?.orderBy,
			take: options?.pagination?.perPage,
			skip,
		});

		return users.map(PrismaUserMapper.toDomain);
	}

	public async findByFields({
		address,
		...fields
	}: FindByFields<UserFields>): Promise<User | null> {
		const where = {
			...fields,
			id: fields.id?.id,
			cpf: fields.cpf?.cpf,
		};

		const user = await this.prisma.user.findUnique({ where });

		if (!user) {
			return null;
		}

		await this.cache.set("user:", JSON.stringify(user));

		return PrismaUserMapper.toDomain(user);
	}

	public async create(entity: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(entity);

		await this.prisma.user.create({
			data,
		});

		DomainEvents.dispatchEventsForAggregate(entity.id);
	}

	public async update(entity: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(entity);

		await this.prisma.user.update({
			where: {
				id: data.id,
			},
			data,
		});

		DomainEvents.dispatchEventsForAggregate(entity.id);
	}

	public async delete(entity: User): Promise<void> {
		await this.prisma.user.delete({
			where: {
				id: entity.id.id,
			},
		});

		DomainEvents.dispatchEventsForAggregate(entity.id);
	}
}
