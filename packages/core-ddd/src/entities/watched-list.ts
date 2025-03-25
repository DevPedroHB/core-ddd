export abstract class WatchedList<T> {
	public _current: T[];
	private _initial: T[];
	private _new: T[];
	private _removed: T[];

	constructor(initial: T[]) {
		this._initial = initial ? [...initial] : [];
		this._current = initial ? [...initial] : [];
		this._new = [];
		this._removed = [];
	}

	get current() {
		return this._current;
	}

	get initial() {
		return this._initial;
	}

	get new() {
		return this._new;
	}

	get removed() {
		return this._removed;
	}

	private wasAddedInitially(item: T) {
		return this._initial.some((i) => this.compare(i, item));
	}

	private isCurrent(item: T) {
		return this._current.some((i) => this.compare(i, item));
	}

	private isNew(item: T) {
		return this._new.some((i) => this.compare(i, item));
	}

	private isRemoved(item: T) {
		return this._removed.some((i) => this.compare(i, item));
	}

	private removeFromCurrent(item: T) {
		this._current = this._current.filter((i) => !this.compare(i, item));
	}

	private removeFromNew(item: T) {
		this._new = this._new.filter((i) => !this.compare(i, item));
	}

	private removeFromRemoved(item: T) {
		this._removed = this._removed.filter((i) => !this.compare(i, item));
	}

	public exists(item: T) {
		return this.isCurrent(item);
	}

	public add(item: T) {
		if (this.exists(item)) return;

		if (this.isRemoved(item)) {
			this.removeFromRemoved(item);
		}

		this._current.push(item);

		if (!this.wasAddedInitially(item) && !this.isNew(item)) {
			this._new.push(item);
		}
	}

	public update(items: T[]) {
		for (let i = this._current.length - 1; i >= 0; i--) {
			const currentItem = this._current[i];

			if (!items.some((item) => this.compare(item, currentItem))) {
				this._current.splice(i, 1);

				if (
					this.wasAddedInitially(currentItem) &&
					!this.isRemoved(currentItem)
				) {
					this._removed.push(currentItem);
				}
			}
		}

		for (const newItem of items) {
			if (!this.isCurrent(newItem)) {
				this._current.push(newItem);

				if (!this.wasAddedInitially(newItem) && !this.isNew(newItem)) {
					this._new.push(newItem);
				}
			}
		}
	}

	public remove(item: T) {
		if (this.exists(item)) {
			this.removeFromCurrent(item);

			if (this.wasAddedInitially(item) && !this.isRemoved(item)) {
				this._removed.push(item);
			}

			if (this.isNew(item)) {
				this.removeFromNew(item);
			}
		}
	}

	abstract compare(a: T, b: T): boolean;
}
