import { EntityId } from "@/interfaces/entity-id";

/**
 * Classe abstrata genérica que representa uma entidade de domínio com um identificador único.
 *
 * @template T - Tipo das propriedades da entidade.
 * @template ID - Tipo do identificador, deve estender EntityId.
 */
export abstract class Entity<T, ID extends EntityId<ID>> {
	/**
	 * Identificador único da entidade.
	 */
	public readonly id: ID;
	/**
	 * Propriedades internas da entidade.
	 * Protegido para uso apenas em subclasses.
	 */
	protected readonly props: T;

	/**
	 * Construtor protegido para inicialização das propriedades e do identificador.
	 *
	 * @param {T} props - Objeto contendo as propriedades da entidade.
	 * @param {ID} id - Identificador único da entidade.
	 */
	protected constructor(props: T, id: ID) {
		this.id = id;
		this.props = props;
	}

	/**
	 * Compara esta entidade com outra para verificar igualdade de identidade.
	 *
	 * @param {Entity<T, ID>} entity - Outra entidade a ser comparada.
	 * @returns {boolean} True se as duas entidades forem o mesmo objeto ou tiverem o mesmo identificador.
	 */
	public equals(entity: Entity<T, ID>) {
		if (this === entity) {
			return true;
		}

		return this.id.equals(entity.id);
	}
}
