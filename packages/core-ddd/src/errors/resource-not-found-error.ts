import type { UseCaseError } from "@/interfaces/use-case-error";

/**
 * Erro que indica que o recurso solicitado não foi encontrado.
 *
 * @implements {UseCaseError}
 */
export class ResourceNotFoundError extends Error implements UseCaseError {
	/**
	 * Cria uma instância de ResourceNotFoundError.
	 *
	 * @param {string} identifier - Identificador do recurso que não foi encontrado.
	 */
	constructor(identifier: string) {
		super(
			`${identifier} não encontrado. Verifique se o recurso solicitado existe e tente novamente.`,
		);
	}
}
