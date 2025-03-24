import { UniqueEntityId } from "./unique-entity-id";

export abstract class Entity<T> {
	private readonly _id: UniqueEntityId;
	protected readonly props: T;

	protected constructor(props: T, id?: UniqueEntityId) {
		this._id = id ?? new UniqueEntityId();
		this.props = props;
	}

	get id() {
		return this._id;
	}

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
