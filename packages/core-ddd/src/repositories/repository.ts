import type { FetchAllOptions } from "@/types/fetch-all-options";
import type { FindByFields } from "@/types/find-by-fields";

export abstract class Repository<T, E> {
	abstract fetchAll(options?: FetchAllOptions<T>): Promise<E[]>;
	abstract findByFields(fields: FindByFields<T>): Promise<E | null>;
	abstract create(entity: E): Promise<void>;
	abstract update(entity: E): Promise<void>;
	abstract delete(entity: E): Promise<void>;
}
