import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { EntityId } from "@/interfaces/entity-id";
import { createId, isCuid } from "@paralleldrive/cuid2";

/**
 * Value Object para CUID (Collision-resistant Unique Identifier).
 * Encapsula a lógica de validação, comparação e geração de CUIDs.
 *
 * @implements {EntityId<CUID>}
 */
export class CUID implements EntityId<CUID> {
	/**
	 * Valor do CUID validado.
	 */
	public readonly cuid: string;

	/**
	 * Construtor privado que valida o CUID informado.
	 *
	 * @param {string} cuid - CUID em formato de string.
	 * @throws {InvalidCredentialsError} Caso o CUID fornecido seja inválido.
	 */
	private constructor(cuid: string) {
		if (!CUID.isValid(cuid)) {
			throw new InvalidCredentialsError("CUID fornecido é inválido.");
		}

		this.cuid = cuid;
	}

	/**
	 * Compara se outro CUID é igual a este.
	 *
	 * @param {CUID} id - Instância de CUID para comparação.
	 * @returns {boolean} True se os CUIDs forem idênticos, false caso contrário.
	 */
	public equals(id: CUID) {
		return this === id || this.cuid === id.cuid;
	}

	/**
	 * Verifica se uma string é um CUID válido.
	 *
	 * @param {string} cuid - String a ser validada como CUID.
	 * @returns {boolean} True se for um CUID válido, false caso contrário.
	 */
	public static isValid(cuid: string) {
		return isCuid(cuid);
	}

	/**
	 * Gera um novo CUID aleatório.
	 *
	 * @returns {string} CUID gerado.
	 */
	public static generate() {
		return createId();
	}

	/**
	 * Cria uma instância de CUID validada a partir de uma string.
	 *
	 * @param {string} cuid - CUID em formato de string.
	 * @returns {CUID} Instância de CUID validada.
	 */
	public static create(cuid: string) {
		return new CUID(cuid);
	}
}
