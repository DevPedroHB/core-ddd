import type { Entity } from "@/entities/entity";
import type { EntityId } from "@/interfaces/entity-id";
import type { FetchAllOptions } from "@/types/fetch-all-options";
import type { FindByFields } from "@/types/find-by-fields";

/**
 * Repositório genérico para entidades, definindo operações de leitura, criação, atualização e remoção.
 *
 * @template E - Tipo de entidade que estende Entity<P, EntityId>.
 */
export abstract class Repository<E extends Entity<unknown, EntityId<unknown>>> {
	/**
	 * Busca todas as entidades que atendem às opções fornecidas.
	 *
	 * @param {FetchAllOptions<E>} [options] - Opções de filtragem, ordenação e paginação.
	 * @returns {Promise<E[]>} Promessa que resolve para um array de entidades.
	 */
	public abstract fetchAll(options?: FetchAllOptions<E>): Promise<E[]>;
	/**
	 * Encontra uma entidade que corresponda aos campos fornecidos.
	 *
	 * @param {FindByFields<E>} fields - Campos para busca.
	 * @returns {Promise<E | null>} Promessa que resolve para a entidade encontrada ou null.
	 */
	public abstract findByFields(fields: FindByFields<E>): Promise<E | null>;
	/**
	 * Persiste uma nova entidade no repositório.
	 *
	 * @param {E} entity - Entidade a ser criada.
	 * @returns {Promise<void>} Promessa que resolve quando a operação for concluída.
	 */
	public abstract create(entity: E): Promise<void>;
	/**
	 * Atualiza uma entidade existente no repositório.
	 *
	 * @param {E} entity - Entidade com dados atualizados.
	 * @returns {Promise<void>} Promessa que resolve quando a operação for concluída.
	 */
	public abstract update(entity: E): Promise<void>;
	/**
	 * Remove uma entidade do repositório.
	 *
	 * @param {E} entity - Entidade a ser removida.
	 * @returns {Promise<void>} Promessa que resolve quando a operação for concluída.
	 */
	public abstract delete(entity: E): Promise<void>;
}
