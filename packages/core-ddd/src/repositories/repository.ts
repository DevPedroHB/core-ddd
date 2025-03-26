import type { FetchAllOptions } from "@/types/fetch-all-options";
import type { FindByFields } from "@/types/find-by-fields";

export abstract class Repository<F, E> {
	abstract fetchAll(options?: FetchAllOptions<F>): Promise<E[]>;
	abstract findByFields(fields: FindByFields<F>): Promise<E | null>;
	abstract create(entity: E): Promise<void>;
	abstract update(entity: E): Promise<void>;
	abstract delete(entity: E): Promise<void>;
}
