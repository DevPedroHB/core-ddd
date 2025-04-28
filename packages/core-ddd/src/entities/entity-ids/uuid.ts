import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import type { EntityId } from "@/interfaces/entity-id";
import {
	type UUIDTypes,
	parse,
	stringify,
	v1,
	v3,
	v4,
	v5,
	v6,
	v7,
	validate,
	version,
} from "uuid";

/**
 * Value Object para UUID (Universally Unique Identifier).
 * Encapsula a lógica de validação, análise, geração e comparação de UUIDs das versões 1, 3, 4, 5, 6 e 7.
 *
 * @implements {EntityId<UUID>}
 */
export class UUID implements EntityId<UUID> {
	/**
	 * UUID validado em formato de string.
	 */
	public readonly uuid: string;
	/**
	 * Versão do UUID (1, 3, 4, 5, 6 ou 7).
	 */
	public readonly version: number;

	/**
	 * Construtor privado que valida o UUID informado e define sua versão.
	 *
	 * @param {string} uuid - UUID em formato de string.
	 * @throws {InvalidCredentialsError} Caso o UUID seja inválido.
	 */
	private constructor(uuid: string) {
		if (!UUID.isValid(uuid)) {
			throw new InvalidCredentialsError("UUID fornecido é inválido.");
		}

		this.uuid = uuid;
		this.version = UUID.version(uuid);
	}

	/**
	 * Compara se outro objeto UUID é igual a este.
	 *
	 * @param {UUID} id - Instância de UUID para comparação.
	 * @returns {boolean} True se referir ao mesmo objeto ou tiverem o mesmo valor de UUID.
	 */
	public equals(id: UUID) {
		return this === id || this.uuid === id.uuid;
	}

	/**
	 * Converte uma string de UUID em um array de bytes.
	 *
	 * @param {string} uuid - UUID em formato de string.
	 * @returns {Uint8Array} Array de bytes correspondente ao UUID.
	 */
	public static parse(uuid: string) {
		return parse(uuid);
	}

	/**
	 * Converte um array de bytes em uma string de UUID.
	 *
	 * @param {Uint8Array} arr - Array de bytes do UUID.
	 * @param {number} [offset] - Posição inicial no array para leitura.
	 * @returns {string} UUID formatado como string.
	 */
	public static stringify(arr: Uint8Array, offset?: number) {
		return stringify(arr, offset);
	}

	/**
	 * Retorna a versão de um UUID.
	 *
	 * @param {string} uuid - UUID em formato de string.
	 * @returns {number} Versão do UUID (1, 3, 4, 5, 6 ou 7).
	 */
	public static version(uuid: string) {
		return version(uuid);
	}

	/**
	 * Verifica se um valor é um UUID válido.
	 *
	 * @param {unknown} uuid - Valor a ser validado como UUID.
	 * @returns {boolean} True se for um UUID válido, false caso contrário.
	 */
	public static isValid(uuid: unknown) {
		return validate(uuid);
	}

	/**
	 * Gera um UUID de acordo com a versão especificada.
	 *
	 * @param {"v1"|"v3"|"v4"|"v5"|"v6"|"v7"} [version="v4"] - Versão do UUID desejada.
	 * @param {string|Uint8Array} [value] - Valor ou buffer para geração baseada em namespace (v3/v5).
	 * @param {UUIDTypes} [namespace] - Namespace para geração baseada em UUIDTypes (v3/v5).
	 * @returns {string} UUID gerado como string.
	 * @throws {InvalidCredentialsError} Caso faltem parâmetros para v3/v5, a versão seja inválida ou parâmetros sejam do tipo inadequado.
	 */
	public static generate(
		version: "v1" | "v3" | "v4" | "v5" | "v6" | "v7" = "v4",
		value?: string | Uint8Array,
		namespace?: UUIDTypes,
	) {
		try {
			switch (version) {
				case "v1":
					return v1();
				case "v3":
					if (!value || !namespace) {
						throw new InvalidCredentialsError(
							"É necessário fornecer 'value' e 'namespace' para gerar UUID v3.",
						);
					}

					return v3(value, namespace);
				case "v4":
					return v4();
				case "v5":
					if (!value || !namespace) {
						throw new InvalidCredentialsError(
							"É necessário fornecer 'value' e 'namespace' para gerar UUID v5.",
						);
					}

					return v5(value, namespace);
				case "v6":
					return v6();
				case "v7":
					return v7();
				default:
					throw new InvalidCredentialsError("Versão de UUID inválida.");
			}
		} catch (error) {
			if (error instanceof TypeError) {
				throw new InvalidCredentialsError(
					"Parâmetros inválidos fornecidos para geração de UUID.",
				);
			}

			throw error;
		}
	}

	/**
	 * Cria uma instância de UUID validada a partir de uma string.
	 *
	 * @param {string} uuid - UUID em formato de string.
	 * @returns {UUID} Instância de UUID validada e encapsulada.
	 * @throws {InvalidCredentialsError} Caso o UUID seja inválido.
	 */
	public static create(uuid: string) {
		return new UUID(uuid);
	}
}
