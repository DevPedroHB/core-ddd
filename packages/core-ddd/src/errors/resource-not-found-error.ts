import type { UseCaseError } from "@/interfaces/use-case-error";

/**
 * Erro lançado quando um recurso não é encontrado no sistema.
 *
 * @extends Error
 * @implements UseCaseError
 */
export class ResourceNotFoundError extends Error implements UseCaseError {
	/** Nome do erro para exibição em logs e em error.toString() */
	public readonly name = "ResourceNotFoundError";
	/** Código HTTP sugerido para respostas REST (404 Not Found) */
	public readonly statusCode = 404;

	/**
	 * Cria uma instância de ResourceNotFoundError.
	 *
	 * @param message - Mensagem de erro personalizada.
	 *                  Se não fornecida, usa mensagem padrão em português.
	 * @param options - Opções nativas do Error (por ex., `cause`).
	 */
	constructor(
		message = "Recurso não encontrado. Verifique se o recurso solicitado existe e tente novamente.",
		options?: ErrorOptions,
	) {
		super(message, options);

		// Garante o protótipo correto: instâncias → ResourceNotFoundError
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
