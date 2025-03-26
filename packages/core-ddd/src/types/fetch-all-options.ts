import type { Pagination } from "@/interfaces/pagination";
import { FindByFields } from "./find-by-fields";
import type { SortOrder } from "./sort-order";

export type FetchAllOptions<T> = Partial<{
	fields: FindByFields<T>;
	orderBy: SortOrder<T>;
	pagination: Pagination;
}>;
