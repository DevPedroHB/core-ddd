import {
	UserFields,
	UsersRepository,
} from "@/domain/account/application/repositories/users-repository";
import { User } from "@/domain/account/enterprise/entities/user";
import {
	DomainEvents,
	FetchAllOptions,
	FindByFields,
	filterItemsByFields,
	paginateItems,
	sortItems,
} from "@pedrohb/core-ddd";

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = [];

	public async fetchAll(
		options?: FetchAllOptions<UserFields>,
	): Promise<User[]> {
		const { fields, orderBy, pagination } = options || {};

		let users = this.items;

		if (fields) {
			users = filterItemsByFields(users, fields);
		}

		if (orderBy) {
			users = sortItems(users, orderBy);
		}

		if (pagination) {
			users = paginateItems(users, pagination);
		}

		return users;
	}

	public async findByFields(
		fields: FindByFields<UserFields>,
	): Promise<User | null> {
		const filteredItems = filterItemsByFields(this.items, fields);

		if (filteredItems.length === 0) {
			return null;
		}

		return filteredItems[0];
	}

	public async create(entity: User): Promise<void> {
		this.items.push(entity);

		DomainEvents.dispatchEventsForAggregate(entity.id);
	}

	public async update(entity: User): Promise<void> {
		const index = this.items.findIndex((item) => item.id.equals(entity.id));

		if (index === -1) {
			return;
		}

		this.items[index] = entity;

		DomainEvents.dispatchEventsForAggregate(entity.id);
	}

	public async delete(entity: User): Promise<void> {
		const index = this.items.findIndex((item) => item.id.equals(entity.id));

		if (index === -1) {
			return;
		}

		this.items.splice(index, 1);

		DomainEvents.dispatchEventsForAggregate(entity.id);
	}
}
