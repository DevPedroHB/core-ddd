import type { UseCaseError } from "@/interfaces/use-case-error";

/**
 * Erro lançado quando uma operação não é permitida para o usuário atual.
 *
 * @extends Error
 * @implements UseCaseError
 */
export class NotAllowedError extends Error implements UseCaseError {
	/** Nome do erro para exibição em logs e em error.toString() */
	public readonly name = "NotAllowedError";
	/** Código HTTP sugerido para respostas REST (403 Forbidden) */
	public readonly statusCode = 403;

	/**
	 * Cria uma instância de NotAllowedError.
	 *
	 * @param message - Mensagem de erro personalizada.
	 *                  Se não fornecida, usa mensagem padrão em português.
	 * @param options - Opções nativas do Error (por ex., `cause`).
	 */
	constructor(
		message = "Ação não permitida. Você não tem permissão para realizar esta operação.",
		options?: ErrorOptions,
	) {
		super(message, options);

		// Corrige a cadeia de protótipos para que instanceof funcione corretamente
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
