import type { SortOrder } from "@/types/sort-order";

export function sortItems<T>(items: T[], orderBy: SortOrder<T>) {
	if (!orderBy || Object.keys(orderBy).length === 0) {
		return items;
	}

	return [...items].sort((a, b) => {
		for (const [field, order] of Object.entries(orderBy)) {
			const fieldA = a[field as keyof T];
			const fieldB = b[field as keyof T];

			if (fieldA === fieldB) continue;

			const comparison = fieldA < fieldB ? -1 : 1;

			return order === "asc" ? comparison : -comparison;
		}

		return 0;
	});
}
