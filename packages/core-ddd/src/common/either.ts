/**
 * Classe que representa um erro com um valor associado.
 *
 * @template E - Tipo do valor de erro.
 * @template S - Tipo do valor de sucesso relacionado.
 */
export class Error<E, S> {
	/**
	 * Valor associado ao erro.
	 */
	readonly value: E;

	/**
	 * Cria uma instância de Error.
	 *
	 * @param {E} value - Valor associado ao erro.
	 */
	constructor(value: E) {
		this.value = value;
	}

	/**
	 * Indica que esta instância é um erro.
	 *
	 * @returns {boolean} Sempre retorna true.
	 */
	isError(): this is Error<E, S> {
		return true;
	}

	/**
	 * Indica que esta instância não é um sucesso.
	 *
	 * @returns {boolean} Sempre retorna false.
	 */
	isSuccess(): this is Success<E, S> {
		return false;
	}
}

/**
 * Classe que representa um sucesso com um valor associado.
 *
 * @template E - Tipo do valor de erro relacionado.
 * @template S - Tipo do valor de sucesso.
 */
export class Success<E, S> {
	/**
	 * Valor associado ao sucesso.
	 */
	readonly value: S;

	/**
	 * Cria uma instância de Success.
	 *
	 * @param {S} value - Valor associado ao sucesso.
	 */
	constructor(value: S) {
		this.value = value;
	}

	/**
	 * Indica que esta instância não é um erro.
	 *
	 * @returns {boolean} Sempre retorna false.
	 */
	isError(): this is Error<E, S> {
		return false;
	}

	/**
	 * Indica que esta instância é um sucesso.
	 *
	 * @returns {boolean} Sempre retorna true.
	 */
	isSuccess(): this is Success<E, S> {
		return true;
	}
}

/**
 * Tipo que representa uma união entre um erro ou um sucesso.
 *
 * @template E - Tipo do valor de erro.
 * @template S - Tipo do valor de sucesso.
 */
export type Either<E, S> = Error<E, S> | Success<E, S>;

/**
 * Função auxiliar para criar uma instância de Error.
 *
 * @template E - Tipo do valor de erro.
 * @template S - Tipo do valor de sucesso relacionado.
 * @param {E} value - Valor do erro.
 * @returns {Either<E, S>} Instância de Error.
 */
export const error = <E, S>(value: E): Either<E, S> => {
	return new Error(value);
};

/**
 * Função auxiliar para criar uma instância de Success.
 *
 * @template E - Tipo do valor de erro relacionado.
 * @template S - Tipo do valor de sucesso.
 * @param {S} value - Valor do sucesso.
 * @returns {Either<E, S>} Instância de Success.
 */
export const success = <E, S>(value: S): Either<E, S> => {
	return new Success(value);
};
