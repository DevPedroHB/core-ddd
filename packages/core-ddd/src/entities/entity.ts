import { UniqueEntityId } from "./unique-entity-id";

/**
 * Classe abstrata que representa uma entidade com uma identificação única e propriedades associadas.
 *
 * @template T - Tipo das propriedades da entidade.
 */
export abstract class Entity<T> {
	/**
	 * ID única da entidade.
	 * @private
	 */
	private readonly _id: UniqueEntityId;
	/**
	 * Propriedades da entidade.
	 * @protected
	 */
	protected readonly props: T;

	/**
	 * Cria uma instância de Entity.
	 * Se um ID não for fornecido, é gerado um novo UniqueEntityId.
	 *
	 * @param {T} props - Propriedades associadas à entidade.
	 * @param {UniqueEntityId} [id] - ID opcional da entidade.
	 */
	protected constructor(props: T, id?: UniqueEntityId) {
		this._id = id ?? new UniqueEntityId();
		this.props = props;
	}

	/**
	 * Obtém o ID único da entidade.
	 *
	 * @returns {UniqueEntityId} ID único da entidade.
	 */
	get id() {
		return this._id;
	}

	/**
	 * Compara esta entidade com outra para verificar se são iguais.
	 * Duas entidades são consideradas iguais se seus IDs são iguais.
	 *
	 * @param {Entity<unknown>} entity - Outra entidade para comparação.
	 * @returns {boolean} Retorna true se as entidades forem iguais; caso contrário, false.
	 */
	public equals(entity: Entity<unknown>) {
		if (this === entity) {
			return true;
		}

		if (this.id.equals(entity.id)) {
			return true;
		}

		return false;
	}
}
