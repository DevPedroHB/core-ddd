import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import type { EntityId } from "@/interfaces/entity-id";
import {
	type PRNG,
	decodeTime,
	encodeTime,
	fixULIDBase32,
	incrementBase32,
	isValid,
	ulid,
	ulidToUUID,
	uuidToULID,
} from "ulid";

/**
 * Objeto de valor que representa um ULID (Identificador Lexicograficamente Ordenável Unicamente Universal).
 * Implementa a interface EntityId para garantir comportamento consistente de IDs.
 *
 * @implements {EntityId<ULID>}
 */
export class ULID implements EntityId<ULID> {
	/**
	 * String que contém o ULID.
	 * @readonly
	 */
	public readonly ulid: string;

	/**
	 * Cria uma nova instância de ULID.
	 *
	 * @param {string} ulid - String de ULID válida.
	 * @throws {InvalidCredentialsError} Caso o ULID fornecido seja inválido.
	 */
	private constructor(ulid: string) {
		if (!ULID.isValid(ulid)) {
			throw new InvalidCredentialsError("ULID fornecido é inválido.");
		}

		this.ulid = ulid;
	}

	/**
	 * Verifica se este ULID é igual a outro.
	 *
	 * @param {ULID} id - Outra instância de ULID para comparação.
	 * @returns {boolean} Retorna true se ambos representarem o mesmo ULID.
	 */
	public equals(id: ULID) {
		return this === id || this.ulid === id.ulid;
	}

	/**
	 * Decodifica a parte de tempo de um ULID para milissegundos desde a era Unix.
	 *
	 * @param {string} ulid - String de ULID a ser decodificada.
	 * @returns {number} Milissegundos desde o epoch Unix.
	 */
	public static decodeTime(ulid: string) {
		return decodeTime(ulid);
	}

	/**
	 * Codifica um timestamp em uma string Base32 compatível com ULID.
	 *
	 * @param {number} now - Milissegundos desde o epoch Unix.
	 * @param {number} [len] - Comprimento opcional da string de tempo.
	 * @returns {string} String de tempo em Base32.
	 */
	public static encodeTime(now: number, len?: number) {
		return encodeTime(now, len);
	}

	/**
	 * Normaliza uma string de ULID para formato Base32, corrigindo caracteres ambíguos.
	 *
	 * @param {string} ulid - String de ULID a ser normalizada.
	 * @returns {string} ULID normalizado em Base32.
	 */
	public static fixULIDBase32(ulid: string) {
		return fixULIDBase32(ulid);
	}

	/**
	 * Incrementa lexicograficamente uma string Base32.
	 *
	 * @param {string} str - String Base32 a ser incrementada.
	 * @returns {string} String Base32 incrementada.
	 */
	public static incrementBase32(str: string) {
		return incrementBase32(str);
	}

	/**
	 * Converte um ULID em string de UUID.
	 *
	 * @param {string} ulid - ULID a ser convertido.
	 * @returns {string} UUID correspondente.
	 */
	public static ulidToUUID(ulid: string) {
		return ulidToUUID(ulid);
	}

	/**
	 * Converte uma string de UUID em ULID.
	 *
	 * @param {string} uuid - UUID a ser convertido.
	 * @returns {string} ULID correspondente.
	 */
	public static uuidToULID(uuid: string) {
		return uuidToULID(uuid);
	}

	/**
	 * Verifica se uma string está no formato ULID válido.
	 *
	 * @param {string} ulid - String a ser validada.
	 * @returns {boolean} True se for ULID válido, caso contrário false.
	 */
	public static isValid(ulid: string) {
		return isValid(ulid);
	}

	/**
	 * Gera uma nova string ULID.
	 *
	 * @param {number} [seedTime] - Timestamp opcional em milissegundos para semente.
	 * @param {PRNG} [prng] - Função de gerador de números pseudoaleatórios opcional.
	 * @returns {string} Nova string ULID.
	 */
	public static generate(seedTime?: number, prng?: PRNG) {
		return ulid(seedTime, prng);
	}

	/**
	 * Cria uma instância de ULID a partir de uma string existente.
	 *
	 * @param {string} ulid - String de ULID válida.
	 * @returns {ULID} Nova instância de ULID.
	 */
	public static create(ulid: string) {
		return new ULID(ulid);
	}
}
