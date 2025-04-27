/**
 * Repositório abstrato para cache de valores em string.
 *
 * @abstract
 */
export abstract class CacheRepository {
	/**
	 * Recupera um valor do cache pelo identificador (chave).
	 *
	 * @param {string} key - Identificador único do valor em cache.
	 * @returns {Promise<string | null>} Promessa que resolve para o valor em cache, ou null caso não exista.
	 */
	public abstract get(key: string): Promise<string | null>;
	/**
	 * Armazena um valor no cache sob a chave especificada.
	 *
	 * @param {string} key - Identificador único para armazenar o valor.
	 * @param {string} value - Valor em string a ser armazenado no cache.
	 * @returns {Promise<void>} Promessa que resolve quando o valor for armazenado.
	 */
	public abstract set(key: string, value: string): Promise<void>;
	/**
	 * Remove um valor do cache pelo identificador (chave).
	 *
	 * @param {string} key - Identificador único do valor a ser removido do cache.
	 * @returns {Promise<void>} Promessa que resolve quando a remoção for concluída.
	 */
	public abstract del(key: string): Promise<void>;
}
