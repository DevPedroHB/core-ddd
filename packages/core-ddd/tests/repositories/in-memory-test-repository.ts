import { DomainEvents } from "@/events/domain-events";
import { filterItemsByFields } from "@/functions/filter-items-by-fields";
import { paginateItems } from "@/functions/paginate-items";
import { sortItems } from "@/functions/sort-items";
import type { FetchAllOptions } from "@/types/fetch-all-options";
import type { FindByFields } from "@/types/find-by-fields";
import type { TestAggregateRoot } from "@tests/entities/test-aggregate-root";
import type {
	TestAggregateRootFields,
	TestRepository,
} from "./test-repository";

export class InMemoryTestRepository implements TestRepository {
	public items: TestAggregateRoot[] = [];

	async fetchAll(options?: FetchAllOptions<TestAggregateRootFields>) {
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

	async findByFields(fields: FindByFields<TestAggregateRootFields>) {
		const filteredItems = filterItemsByFields(this.items, fields);

		if (filteredItems.length === 0) {
			return null;
		}

		return filteredItems[0];
	}

	async create(entity: TestAggregateRoot) {
		this.items.push(entity);

		DomainEvents.dispatchEventsForAggregate(entity.id);
	}

	async update(entity: TestAggregateRoot) {
		const index = this.items.findIndex((item) => item.id.equals(entity.id));

		if (index === -1) {
			return;
		}

		this.items[index] = entity;

		DomainEvents.dispatchEventsForAggregate(entity.id);
	}

	async delete(entity: TestAggregateRoot) {
		const index = this.items.findIndex((item) => item.id.equals(entity.id));

		if (index === -1) {
			return;
		}

		this.items.splice(index, 1);

		DomainEvents.dispatchEventsForAggregate(entity.id);
	}

	async findByName(name: string) {
		const filteredItems = filterItemsByFields(this.items, {
			name,
		});

		if (filteredItems.length === 0) {
			return null;
		}

		return filteredItems[0];
	}
}
