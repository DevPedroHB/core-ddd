/**
 * Interface para configuração de paginação de dados.
 *
 * @interface Pagination
 */
export interface Pagination {
	/**
	 * Número da página atual.
	 */
	page: number;
	/**
	 * Quantidade de itens por página.
	 */
	perPage: number;
}
