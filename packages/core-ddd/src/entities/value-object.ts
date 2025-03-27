/**
 * Representa um objeto de valor que encapsula propriedades imutáveis e implementa comparação por valor.
 *
 * @template T - Tipo das propriedades que definem o objeto de valor.
 */
export abstract class ValueObject<T> {
	/**
	 * Propriedades imutáveis que definem o objeto de valor.
	 * @protected
	 */
	protected readonly props: T;

	/**
	 * Cria uma instância de ValueObject.
	 *
	 * @param {T} props - Propriedades do objeto de valor.
	 * @protected
	 */
	protected constructor(props: T) {
		this.props = props;
	}

	/**
	 * Compara este objeto de valor com outro para determinar se são iguais.
	 * A igualdade é baseada na comparação dos valores das propriedades.
	 *
	 * @param {ValueObject<unknown>} valueObject - Outro objeto de valor a ser comparado.
	 * @returns {boolean} Retorna true se os objetos de valor forem iguais; caso contrário, false.
	 */
	public equals(valueObject: ValueObject<unknown>) {
		if (this === valueObject) {
			return true;
		}

		if (JSON.stringify(this.props) === JSON.stringify(valueObject.props)) {
			return true;
		}

		return false;
	}
}
