import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";
import {
	FetchAllOptions,
	FindByFields,
	ResourceNotFoundError,
	filterItemsByFields,
	paginateItems,
	sortItems,
} from "@pedrohb/core-ddd";

export class InMemoryNotificationsRepository
	implements NotificationsRepository
{
	public items: Notification[] = [];

	public async fetchAll(
		options?: FetchAllOptions<Notification>,
	): Promise<Notification[]> {
		const { fields, orderBy, pagination } = options || {};

		let testAggregateRoot = this.items;

		if (fields) {
			testAggregateRoot = filterItemsByFields(testAggregateRoot, fields);
		}

		if (orderBy) {
			testAggregateRoot = sortItems(testAggregateRoot, orderBy);
		}

		if (pagination) {
			testAggregateRoot = paginateItems(testAggregateRoot, pagination);
		}

		return testAggregateRoot;
	}

	public async findByFields(
		fields: FindByFields<Notification>,
	): Promise<Notification | null> {
		const filteredItems = filterItemsByFields(this.items, fields);

		if (filteredItems.length === 0) {
			return null;
		}

		return filteredItems[0];
	}

	public async create(entity: Notification): Promise<void> {
		this.items.push(entity);
	}

	public async update(entity: Notification): Promise<void> {
		const index = this.items.findIndex((item) => item.id.equals(entity.id));

		if (index === -1) {
			throw new ResourceNotFoundError();
		}

		this.items[index] = entity;
	}

	public async delete(entity: Notification): Promise<void> {
		const index = this.items.findIndex((item) => item.id.equals(entity.id));

		if (index === -1) {
			throw new ResourceNotFoundError();
		}

		this.items.splice(index, 1);
	}
}
