import type { UseCaseError } from "@/interfaces/use-case-error";

/**
 * Erro lançado quando um recurso já existe no sistema.
 *
 * @extends Error
 * @implements UseCaseError
 */
export class AlreadyExistsError extends Error implements UseCaseError {
	/** Nome do erro para exibição em logs e em error.toString() */
	public readonly name = "AlreadyExistsError";
	/** Código HTTP sugerido para respostas REST (409 Conflict) */
	public readonly statusCode = 409;

	/**
	 * Cria uma instância de AlreadyExistsError.
	 *
	 * @param message - Mensagem de erro personalizada.
	 *                  Se não fornecida, usa mensagem padrão em português.
	 * @param options - Opções nativas do Error (por ex., `cause`).
	 */
	constructor(
		message = "O recurso já existe. Por favor, tente utilizar informações diferentes.",
		options?: ErrorOptions,
	) {
		super(message, options);

		// Garante o protótipo correto: instâncias → AlreadyExistsError
		Object.setPrototypeOf(this, AlreadyExistsError.prototype);
	}
}
