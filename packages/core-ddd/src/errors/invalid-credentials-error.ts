import type { UseCaseError } from "@/interfaces/use-case-error";

/**
 * Erro que indica que as credenciais fornecidas são inválidas.
 *
 * @implements {UseCaseError}
 */
export class InvalidCredentialsError extends Error implements UseCaseError {
	/**
	 * Cria uma instância de InvalidCredentialsError.
	 */
	constructor() {
		super(
			"As credenciais estão incorretas. Verifique as informações e tente novamente.",
		);
	}
}
