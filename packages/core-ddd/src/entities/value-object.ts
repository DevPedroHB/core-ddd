export abstract class ValueObject<T> {
	protected readonly props: T;

	protected constructor(props: T) {
		this.props = props;
	}

	public equals(valueObject: ValueObject<unknown>) {
		if (this === valueObject) {
			return true;
		}

		if (JSON.stringify(this.props) === JSON.stringify(valueObject.props)) {
			return true;
		}

		return false;
	}
}
