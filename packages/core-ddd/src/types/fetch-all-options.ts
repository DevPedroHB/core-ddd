import type { Pagination } from "@/interfaces/pagination";
import { FindByFields } from "./find-by-fields";
import type { SortOrder } from "./sort-order";

/**
 * Define as opções para a busca de itens com filtros, ordenação e paginação.
 *
 * @template T - Tipo dos campos que podem ser utilizados para filtragem e ordenação.
 * @property {FindByFields<T>} [fields] - Campos e valores para filtrar os itens.
 * @property {SortOrder<T>} [orderBy] - Critérios de ordenação dos itens.
 * @property {Pagination} [pagination] - Opções de paginação.
 */
export type FetchAllOptions<T> = Partial<{
	fields: FindByFields<T>;
	orderBy: SortOrder<T>;
	pagination: Pagination;
}>;
