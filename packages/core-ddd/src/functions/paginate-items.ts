import type { Pagination } from "@/interfaces/pagination";

export function paginateItems<T>(items: T[], pagination: Pagination) {
	if (!pagination) {
		return items;
	}

	const { page, perPage } = pagination;
	const start = (page - 1) * perPage;
	const end = start + perPage;

	return items.slice(start, end);
}
