import type { FetchAllOptions } from "@/types/fetch-all-options";
import type { FindByFields } from "@/types/find-by-fields";

/**
 * Classe abstrata que define a interface de um repositório para gerenciar entidades.
 *
 * @template F - Tipo dos filtros ou opções para buscas.
 * @template E - Tipo da entidade gerenciada pelo repositório.
 */
export abstract class Repository<F, E> {
	/**
	 * Busca todas as entidades, opcionalmente utilizando filtros e opções de paginação.
	 *
	 * @param {FetchAllOptions<F>} [options] - Opções para a busca, tais como filtros, ordenação e paginação.
	 * @returns {Promise<E[]>} Uma promessa que resolve com um array de entidades.
	 */
	abstract fetchAll(options?: FetchAllOptions<F>): Promise<E[]>;
	/**
	 * Busca uma entidade que corresponda aos campos fornecidos.
	 *
	 * @param {FindByFields<F>} fields - Objeto contendo os campos e valores para filtrar a entidade.
	 * @returns {Promise<E | null>} Uma promessa que resolve com a entidade encontrada ou null se nenhuma for encontrada.
	 */
	abstract findByFields(fields: FindByFields<F>): Promise<E | null>;
	/**
	 * Cria uma nova entidade no repositório.
	 *
	 * @param {E} entity - A entidade a ser criada.
	 * @returns {Promise<void>} Uma promessa que indica a conclusão da operação.
	 */
	abstract create(entity: E): Promise<void>;
	/**
	 * Atualiza uma entidade existente no repositório.
	 *
	 * @param {E} entity - A entidade a ser atualizada.
	 * @returns {Promise<void>} Uma promessa que indica a conclusão da operação.
	 */
	abstract update(entity: E): Promise<void>;
	/**
	 * Remove uma entidade do repositório.
	 *
	 * @param {E} entity - A entidade a ser removida.
	 * @returns {Promise<void>} Uma promessa que indica a conclusão da operação.
	 */
	abstract delete(entity: E): Promise<void>;
}
