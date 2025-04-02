/**
 * Representa uma lista observada que mantém o registro dos itens atuais, iniciais,
 * adicionados e removidos, permitindo operações de adição, atualização e remoção.
 *
 * @template T - Tipo dos itens na lista.
 */
export abstract class WatchedList<T> {
	/**
	 * Array contendo os itens atualmente presentes.
	 */
	private _current: T[];
	/**
	 * Array contendo os itens iniciais.
	 * @private
	 */
	private _initial: T[];
	/**
	 * Array contendo os itens que foram adicionados após a criação inicial.
	 * @private
	 */
	private _new: T[];
	/**
	 * Array contendo os itens que foram removidos.
	 * @private
	 */
	private _removed: T[];

	/**
	 * Cria uma instância de WatchedList.
	 *
	 * @param {T[]} initial - Array inicial de itens.
	 */
	constructor(initial: T[]) {
		this._initial = initial ? [...initial] : [];
		this._current = initial ? [...initial] : [];
		this._new = [];
		this._removed = [];
	}

	/**
	 * Obtém os itens atuais da lista.
	 *
	 * @returns {T[]} Array contendo os itens atuais.
	 */
	get current() {
		return this._current;
	}

	/**
	 * Obtém os itens iniciais da lista.
	 *
	 * @returns {T[]} Array contendo os itens iniciais.
	 */
	get initial() {
		return this._initial;
	}

	/**
	 * Obtém os itens que foram adicionados após a criação inicial.
	 *
	 * @returns {T[]} Array contendo os itens novos.
	 */
	get new() {
		return this._new;
	}

	/**
	 * Obtém os itens que foram removidos da lista.
	 *
	 * @returns {T[]} Array contendo os itens removidos.
	 */
	get removed() {
		return this._removed;
	}

	/**
	 * Verifica se o item foi adicionado inicialmente na lista.
	 *
	 * @private
	 * @param {T} item - Item a ser verificado.
	 * @returns {boolean} Retorna true se o item estiver na lista inicial; caso contrário, false.
	 */
	private wasAddedInitially(item: T) {
		return this._initial.some((i) => this.compare(i, item));
	}

	/**
	 * Verifica se o item está presente na lista atual.
	 *
	 * @private
	 * @param {T} item - Item a ser verificado.
	 * @returns {boolean} Retorna true se o item estiver na lista atual; caso contrário, false.
	 */
	private isCurrent(item: T) {
		return this._current.some((i) => this.compare(i, item));
	}

	/**
	 * Verifica se o item está presente na lista de itens novos.
	 *
	 * @private
	 * @param {T} item - Item a ser verificado.
	 * @returns {boolean} Retorna true se o item estiver na lista de itens novos; caso contrário, false.
	 */
	private isNew(item: T) {
		return this._new.some((i) => this.compare(i, item));
	}

	/**
	 * Verifica se o item está presente na lista de itens removidos.
	 *
	 * @private
	 * @param {T} item - Item a ser verificado.
	 * @returns {boolean} Retorna true se o item estiver na lista de itens removidos; caso contrário, false.
	 */
	private isRemoved(item: T) {
		return this._removed.some((i) => this.compare(i, item));
	}

	/**
	 * Remove o item da lista atual.
	 *
	 * @private
	 * @param {T} item - Item a ser removido da lista atual.
	 */
	private removeFromCurrent(item: T) {
		this._current = this._current.filter((i) => !this.compare(i, item));
	}

	/**
	 * Remove o item da lista de itens novos.
	 *
	 * @private
	 * @param {T} item - Item a ser removido da lista de novos.
	 */
	private removeFromNew(item: T) {
		this._new = this._new.filter((i) => !this.compare(i, item));
	}

	/**
	 * Remove o item da lista de itens removidos.
	 *
	 * @private
	 * @param {T} item - Item a ser removido da lista de removidos.
	 */
	private removeFromRemoved(item: T) {
		this._removed = this._removed.filter((i) => !this.compare(i, item));
	}

	/**
	 * Verifica se um item existe na lista atual.
	 *
	 * @param {T} item - Item a ser verificado.
	 * @returns {boolean} Retorna true se o item existir na lista atual; caso contrário, false.
	 */
	public exists(item: T) {
		return this.isCurrent(item);
	}

	/**
	 * Adiciona um item à lista, atualizando as listas de novos e removidos conforme necessário.
	 *
	 * @param {T} item - Item a ser adicionado.
	 */
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

	/**
	 * Atualiza a lista atual com um novo conjunto de itens, ajustando as listas de novos e removidos.
	 *
	 * @param {T[]} items - Novo conjunto de itens para atualizar a lista atual.
	 */
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

	/**
	 * Remove um item da lista, atualizando as listas de itens atuais, novos e removidos conforme necessário.
	 *
	 * @param {T} item - Item a ser removido.
	 */
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

	/**
	 * Método abstrato para comparar dois itens.
	 * Deve ser implementado nas classes derivadas.
	 *
	 * @abstract
	 * @param {T} a - Primeiro item para comparação.
	 * @param {T} b - Segundo item para comparação.
	 * @returns {boolean} Retorna true se os itens forem considerados iguais; caso contrário, false.
	 */
	public abstract compare(a: T, b: T): boolean;
}
