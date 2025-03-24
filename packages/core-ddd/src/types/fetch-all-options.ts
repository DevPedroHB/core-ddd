import type { Pagination } from "@/interfaces/pagination";
import type { SortOrder } from "./sort-order";

export type FetchAllOptions<T> = Partial<{
	fields: Partial<T>;
	orderBy: SortOrder<T>;
	pagination: Pagination;
}>;
