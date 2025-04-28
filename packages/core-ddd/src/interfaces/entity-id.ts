/**
 * Interface genérica para objetos de valor que representam um identificador de entidade.
 * Define o contrato de igualdade entre identificadores.
 *
 * @template T - Tipo da entidade que implementa este identificador.
 */
export interface EntityId<T> {
	/**
	 * Compara este identificador com outro para verificar igualdade.
	 *
	 * @param {T} id - Outro identificador a ser comparado.
	 * @returns {boolean} Retorna true se ambos os identificadores forem iguais, caso contrário false.
	 */
	equals(id: T): boolean;
}
