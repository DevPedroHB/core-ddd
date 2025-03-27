import type { Pagination } from "@/interfaces/pagination";

/**
 * Pagina um array de itens com base nos parâmetros de paginação.
 *
 * @template T - Tipo dos itens do array.
 * @param {T[]} items - Array de itens a ser paginado.
 * @param {Pagination} pagination - Objeto contendo os parâmetros de paginação.
 * @returns {T[]} Array contendo os itens correspondentes à página especificada.
 */
export function paginateItems<T>(items: T[], pagination: Pagination) {
	if (!pagination) {
		return items;
	}

	const { page, perPage } = pagination;
	const start = (page - 1) * perPage;
	const end = start + perPage;

	return items.slice(start, end);
}
