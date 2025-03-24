import type { FindByFields } from "@/types/find-by-fields";

export function filterItemsByFields<E, T>(items: E[], fields: FindByFields<T>) {
	if (!fields || Object.keys(fields).length === 0) {
		return items;
	}

	return items.filter((item) => {
		return Object.entries(fields).every(([key, value]) => {
			return item[key as keyof E] === value;
		});
	});
}
