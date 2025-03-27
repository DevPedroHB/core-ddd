import type { FindByFields } from "@/types/find-by-fields";

/**
 * Filtra um array de itens com base nos campos especificados.
 *
 * @template E - Tipo dos itens do array.
 * @template T - Tipo dos campos utilizados para filtragem.
 * @param {E[]} items - Array de itens a ser filtrado.
 * @param {FindByFields<T>} fields - Objeto com os campos e valores para filtrar os itens.
 * @returns {E[]} Array filtrado de itens que correspondem a todos os campos especificados.
 */
export function filterItemsByFields<E, T>(items: E[], fields: FindByFields<T>) {
	if (!fields || Object.keys(fields).length === 0) {
		return items;
	}

	return items.filter((item) => {
		return Object.entries(fields).every(([key, value]) => {
			return item[key as keyof E] === value;
		});
	});
}
