/**
 * Classe abstrata para hashing de senhas.
 */
export abstract class Hasher {
	/**
	 * Gera um hash a partir de uma string fornecida.
	 *
	 * @param {string} plain - A string em texto plano a ser hashada.
	 * @returns {Promise<string>} O hash gerado.
	 */
	public abstract hash(plain: string): Promise<string>;

	/**
	 * Compara uma string em texto plano com um hash armazenado.
	 *
	 * @param {string} plain - A string em texto plano.
	 * @param {string} hash - O hash previamente gerado.
	 * @returns {Promise<boolean>} Retorna `true` se a string corresponder ao hash, caso contrário, `false`.
	 */
	public abstract compare(plain: string, hash: string): Promise<boolean>;
}
