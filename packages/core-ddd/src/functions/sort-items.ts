import type { SortOrder } from "@/types/sort-order";

/**
 * Ordena um array de itens com base em um objeto que especifica a ordem de ordenação para cada campo.
 *
 * @template T - Tipo dos itens do array.
 * @param {T[]} items - Array de itens a ser ordenado.
 * @param {SortOrder<T>} orderBy - Objeto que define os campos e a direção ("asc" ou "desc") para ordenar os itens.
 * @returns {T[]} Um novo array com os itens ordenados conforme os critérios especificados.
 */
export function sortItems<T>(items: T[], orderBy: SortOrder<T>) {
	if (!orderBy || Object.keys(orderBy).length === 0) {
		return items;
	}

	return [...items].sort((a, b) => {
		for (const [field, order] of Object.entries(orderBy)) {
			const fieldA = a[field as keyof T];
			const fieldB = b[field as keyof T];

			if (fieldA === fieldB) continue;

			const comparison = fieldA < fieldB ? -1 : 1;

			return order === "asc" ? comparison : -comparison;
		}

		return 0;
	});
}
