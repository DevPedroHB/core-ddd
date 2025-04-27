import { DomainEvents } from "@/events/domain-events";
import type { DomainEvent } from "@/interfaces/domain-event";
import { EntityId } from "@/interfaces/entity-id";
import { Entity } from "./entity";

/**
 * Classe abstrata que representa um Aggregate Root, que é uma entidade que gerencia
 * eventos de domínio associados à sua operação.
 *
 * @template T - Tipo das propriedades da entidade.
 * @template ID - Tipo do identificador, deve estender EntityId.
 */
export abstract class AggregateRoot<T, ID extends EntityId<ID>> extends Entity<
	T,
	ID
> {
	/**
	 * Conjunto privado que armazena os eventos de domínio associados a este aggregate.
	 * @private
	 */
	private _domainEvents: Set<DomainEvent<ID>> = new Set();

	/**
	 * Obtém os eventos de domínio registrados neste aggregate.
	 *
	 * @returns {DomainEvent[]} Array contendo os eventos de domínio.
	 */
	get domainEvents() {
		return Array.from(this._domainEvents);
	}

	/**
	 * Adiciona um evento de domínio ao aggregate e marca o aggregate para despacho.
	 *
	 * @param {DomainEvent} domainEvent - Evento de domínio a ser adicionado.
	 * @protected
	 */
	protected addDomainEvent(domainEvent: DomainEvent<ID>) {
		this._domainEvents.add(domainEvent);

		DomainEvents.markAggregateForDispatch(this);
	}

	/**
	 * Remove todos os eventos de domínio registrados neste aggregate.
	 */
	public clearEvents() {
		this._domainEvents.clear();
	}
}
