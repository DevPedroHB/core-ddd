import type { UniqueEntityId } from "@/entities/unique-entity-id";

/**
 * Representa um evento de domínio.
 *
 * @interface DomainEvent
 */
export interface DomainEvent {
	/**
	 * Data e hora em que o evento ocorreu.
	 */
	readonly occurredAt: Date;
	/**
	 * Obtém o ID do agregado associado a este evento.
	 *
	 * @returns {UniqueEntityId} ID do agregado.
	 */
	getAggregateId(): UniqueEntityId;
}
