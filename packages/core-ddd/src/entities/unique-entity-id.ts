import { randomUUID } from "node:crypto";

/**
 * Representa uma identificação única para uma entidade.
 */
export class UniqueEntityId {
	/**
	 * ID única da entidade.
	 * @private
	 */
	private readonly _id: string;

	/**
	 * Cria uma instância de UniqueEntityId.
	 * Se o ID não for fornecido, gera um novo UUID.
	 *
	 * @param {string} [id] - ID opcional para a entidade.
	 */
	constructor(id?: string) {
		this._id = id ?? randomUUID();
	}

	/**
	 * Obtém o ID único da entidade.
	 *
	 * @returns {string} ID único.
	 */
	get id() {
		return this._id;
	}

	/**
	 * Compara este UniqueEntityId com outro para verificar se são iguais.
	 *
	 * @param {UniqueEntityId} uniqueEntityId - Outro UniqueEntityId para comparação.
	 * @returns {boolean} Retorna true se os IDs forem iguais; caso contrário, false.
	 */
	public equals(uniqueEntityId: UniqueEntityId) {
		if (this === uniqueEntityId) {
			return true;
		}

		if (this.id === uniqueEntityId.id) {
			return true;
		}

		return false;
	}
}
