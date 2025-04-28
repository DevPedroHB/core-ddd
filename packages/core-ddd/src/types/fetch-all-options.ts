import type { Entity } from "@/entities/entity";
import type { EntityId } from "@/interfaces/entity-id";
import type { Pagination } from "@/interfaces/pagination";
import type { EntityOf } from "./entity-of";
import type { FindByFields } from "./find-by-fields";
import type { SortOrder } from "./sort-order";

/**
 * Define as opções para buscar múltiplas instâncias de uma entidade.
 *
 * @template E - Tipo de entidade que estende Entity com propriedades e identificador.
 *
 * @property {FindByFields<E>} [fields] - Conjunto de filtros parciais para selecionar entidades por campos e identificador.
 * @property {SortOrder<EntityOf<E>>} [orderBy] - Critérios de ordenação para os resultados, baseado nas propriedades completas da entidade.
 * @property {Pagination} [pagination] - Parâmetros de paginação (página e tamanho máximo de itens).
 *
 * @example
 * ```ts
 * interface UserProps { name: string; age: number; }
 * class User extends Entity<UserProps, UserId> {}
 *
 * const options: FetchAllOptions<User> = {
 *   fields: { age: 30 },
 *   orderBy: { field: 'name', direction: 'asc' },
 *   pagination: { page: 2, perPage: 20 }
 * };
 * ```
 */
export type FetchAllOptions<E extends Entity<unknown, EntityId<unknown>>> = {
	/** Filtros parciais para busca por campos */
	fields?: FindByFields<E>;
	/** Critérios de ordenação */
	orderBy?: SortOrder<EntityOf<E>>;
	/** Configurações de paginação */
	pagination?: Pagination;
};
