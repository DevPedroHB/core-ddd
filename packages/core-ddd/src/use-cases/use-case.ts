/**
 * Classe abstrata que define a estrutura de um caso de uso.
 *
 * @template UseCaseRequest - Tipo da requisição para o caso de uso.
 * @template UseCaseResponse - Tipo da resposta do caso de uso.
 */
export abstract class UseCase<UseCaseRequest, UseCaseResponse> {
	/**
	 * Executa o caso de uso com a requisição fornecida.
	 *
	 * @param {UseCaseRequest} request - Dados de entrada para a execução do caso de uso.
	 * @returns {Promise<UseCaseResponse>} Uma promessa que resolve com a resposta do caso de uso.
	 */
	public abstract execute(request: UseCaseRequest): Promise<UseCaseResponse>;
}
