import { Slug } from "@/entities/utils/slug";

/**
 * Gera uma chave de cache a partir de um prefixo e um conjunto de pares chave-valor,
 * transformando cada valor em um slug personalizado.
 *
 * @param {string} prefix - Prefixo principal da chave de cache.
 * @param {Record<string, unknown>} content - Objeto contendo pares chave-valor a serem incorporados.
 *        Cada valor será convertido em slug e adicionado antes da respectiva chave.
 * @returns {string} Chave de cache formatada, no padrão:
 *        <prefixo>:<valor-em-slug>_<chave>:<valor-em-slug>_<chave>:...
 */
export function formatCacheKey(
	prefix: string,
	content: Record<string, unknown>,
) {
	const parts: string[] = [prefix];

	for (const [key, value] of Object.entries(content)) {
		parts.push(
			Slug.slugify(String(value), {
				separator: "_",
			}),
			key,
		);
	}

	return parts.join(":");
}
