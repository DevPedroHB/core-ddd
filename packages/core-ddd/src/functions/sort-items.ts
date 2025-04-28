import type { SortOrder } from "@/types/sort-order";

/**
 * Ordena um array de itens com base em um objeto que especifica a ordem de ordenação para cada campo.
 * Itens com valor `null` ou `undefined` em algum dos campos de ordenação são descartados.
 *
 * @template T - Tipo dos itens do array.
 * @param {T[]} items - Array de itens a ser ordenado.
 * @param {SortOrder<T>} orderBy - Objeto que define os campos e a direção ("asc" ou "desc") para ordenar os itens.
 * @returns {T[]} Um novo array com os itens ordenados conforme os critérios especificados,
 *               sem aqueles que possuíam valores nulos ou indefinidos nos campos de ordenação.
 */
export function sortItems<T>(items: T[], orderBy: SortOrder<T>) {
	if (!orderBy || Object.keys(orderBy).length === 0) {
		return items;
	}

	// 1) Filtra itens que tenham todos os campos de orderBy definidos (não nulos nem indefinidos)
	const filtered = items.filter((item) =>
		Object.keys(orderBy).every((field) => {
			const value = item[field as keyof T];

			return value !== null && value !== undefined;
		}),
	);

	// 2) Ordena apenas os itens filtrados
	return [...filtered].sort((a, b) => {
		for (const [field, order] of Object.entries(orderBy)) {
			const fieldA = a[field as keyof T];
			const fieldB = b[field as keyof T];

			// se iguais, passa pro próximo critério
			if (fieldA === fieldB) continue;

			// compara valores (assume que são comparáveis com < ou >)
			const comparison = fieldA < fieldB ? -1 : 1;

			return order === "asc" ? comparison : -comparison;
		}

		return 0;
	});
}
