export type SortOrder<T> = Partial<{
	[key in keyof T]: "asc" | "desc";
}>;
