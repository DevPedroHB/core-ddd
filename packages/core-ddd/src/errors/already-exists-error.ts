import type { UseCaseError } from "@/interfaces/use-case-error";

/**
 * Erro que indica que um recurso ou entidade já existe.
 *
 * @implements {UseCaseError}
 */
export class AlreadyExistsError extends Error implements UseCaseError {
	/**
	 * Cria uma instância de AlreadyExistsError.
	 *
	 * @param {string} identifier - Identificador do recurso que já existe.
	 */
	constructor(identifier: string) {
		super(
			`${identifier} já existe. Por favor, tente utilizar informações diferentes.`,
		);
	}
}
