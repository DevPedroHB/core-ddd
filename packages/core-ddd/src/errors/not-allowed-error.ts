import type { UseCaseError } from "@/interfaces/use-case-error";

/**
 * Erro que indica que a operação não é permitida.
 *
 * @implements {UseCaseError}
 */
export class NotAllowedError extends Error implements UseCaseError {
	/**
	 * Cria uma instância de NotAllowedError.
	 */
	constructor() {
		super(
			"Ação não permitida. Você não tem permissão para realizar esta operação.",
		);
	}
}
