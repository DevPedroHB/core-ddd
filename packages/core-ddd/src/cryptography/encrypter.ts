/**
 * Classe abstrata para criptografia de dados.
 */
export abstract class Encrypter {
	/**
	 * Criptografa um objeto contendo dados sensíveis.
	 *
	 * @param {Record<string, unknown>} payload - O objeto contendo os dados a serem criptografados.
	 * @returns {Promise<string>} O valor criptografado em formato de string.
	 */
	public abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}
