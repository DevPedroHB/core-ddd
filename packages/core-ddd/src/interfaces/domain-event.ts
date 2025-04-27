import type { EntityId } from "@/interfaces/entity-id";

/**
 * Representa um evento de domínio associado a um agregado.
 *
 * @template ID Tipo de identificador do agregado (ex.: UUID, CUID, etc.).
 */
export interface DomainEvent<ID extends EntityId<ID>> {
	readonly occurredAt: Date;
	getAggregateId(): ID;
}
