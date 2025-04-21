import type { UseCaseError } from "@/interfaces/use-case-error";

/**
 * Erro lançado quando as credenciais de autenticação estão incorretas.
 *
 * @extends Error
 * @implements UseCaseError
 */
export class InvalidCredentialsError extends Error implements UseCaseError {
	/** Nome do erro para exibição em logs e em error.toString() */
	public readonly name = "InvalidCredentialsError";
	/** Código HTTP sugerido para respostas REST (401 Unauthorized) */
	public readonly statusCode = 401;

	/**
	 * Cria uma instância de InvalidCredentialsError.
	 *
	 * @param message - Mensagem de erro personalizada.
	 *                  Se não fornecida, usa mensagem padrão em português.
	 * @param options - Opções nativas do Error (por ex., `cause`).
	 */
	constructor(
		message = "As credenciais estão incorretas. Verifique as informações e tente novamente.",
		options?: ErrorOptions,
	) {
		super(message, options);

		// Garante o protótipo correto: instâncias → InvalidCredentialsError
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
