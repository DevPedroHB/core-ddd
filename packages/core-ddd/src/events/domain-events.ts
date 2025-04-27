import type { AggregateRoot } from "@/entities/aggregate-root";
import type { DomainEvent } from "@/interfaces/domain-event";
import { EntityId } from "@/interfaces/entity-id";

/**
 * Tipo para a função callback que lida com um evento de domínio.
 *
 * @template T - Tipo do evento de domínio.
 * @param {T} event - O evento de domínio.
 */
type DomainEventCallback<T extends DomainEvent<EntityId<unknown>>> = (
	event: T,
) => void;

/**
 * Classe responsável por gerenciar os eventos de domínio e os agregados marcados para despacho.
 */
export class DomainEvents {
	/**
	 * Mapeamento de nomes de eventos para seus respectivos callbacks.
	 * @private
	 */
	private static handlersMap: Record<
		string,
		DomainEventCallback<DomainEvent<EntityId<unknown>>>[]
	> = {};
	/**
	 * Conjunto de agregados que foram marcados para despacho de eventos.
	 * @private
	 */
	private static markedAggregates: Set<
		AggregateRoot<unknown, EntityId<unknown>>
	> = new Set();
	/**
	 * Flag que indica se os eventos devem ser executados.
	 */
	public static shouldRun = true;

	/**
	 * Marca um agregado para que seus eventos de domínio sejam despachados.
	 *
	 * @param {AggregateRoot<unknown, EntityId<unknown>>} aggregate - Agregado a ser marcado para despacho.
	 */
	public static markAggregateForDispatch(
		aggregate: AggregateRoot<unknown, EntityId<unknown>>,
	) {
		const aggregateFound = !!DomainEvents.findMarkedAggregateByID(aggregate.id);

		if (!aggregateFound) {
			DomainEvents.markedAggregates.add(aggregate);
		}
	}

	/**
	 * Despacha os eventos de domínio para o agregado com o ID fornecido.
	 *
	 * @param {EntityId<unknown>} id - ID do agregado para o qual os eventos devem ser despachados.
	 */
	public static dispatchEventsForAggregate(id: EntityId<unknown>) {
		const aggregate = DomainEvents.findMarkedAggregateByID(id);

		if (aggregate) {
			DomainEvents.dispatchAggregateEvents(aggregate);

			aggregate.clearEvents();

			DomainEvents.removeAggregateFromMarkedDispatchList(aggregate);
		}
	}

	/**
	 * Registra um callback para um determinado nome de evento.
	 *
	 * @param {DomainEventCallback<DomainEvent>} callback - Função a ser chamada quando o evento ocorrer.
	 * @param {string} eventName - Nome do evento a ser registrado.
	 */
	public static register(
		callback: DomainEventCallback<DomainEvent<EntityId<unknown>>>,
		eventName: string,
	) {
		const wasEventRegisteredBefore = eventName in DomainEvents.handlersMap;

		if (!wasEventRegisteredBefore) {
			DomainEvents.handlersMap[eventName] = [];
		}

		DomainEvents.handlersMap[eventName].push(callback);
	}

	/**
	 * Limpa todos os handlers registrados.
	 */
	public static clearHandlers() {
		DomainEvents.handlersMap = {};
	}

	/**
	 * Limpa a lista de agregados marcados para despacho.
	 */
	public static clearMarkedAggregates() {
		DomainEvents.markedAggregates.clear();
	}

	/**
	 * Despacha todos os eventos de domínio registrados para um agregado.
	 *
	 * @private
	 * @param {AggregateRoot<unknown, EntityId<unknown>>} aggregate - Agregado cujo eventos serão despachados.
	 */
	private static dispatchAggregateEvents(
		aggregate: AggregateRoot<unknown, EntityId<unknown>>,
	) {
		for (const event of aggregate.domainEvents) {
			DomainEvents.dispatch(event);
		}
	}

	/**
	 * Remove um agregado da lista de agregados marcados para despacho.
	 *
	 * @private
	 * @param {AggregateRoot<unknown, EntityId<unknown>>} aggregate - Agregado a ser removido.
	 */
	private static removeAggregateFromMarkedDispatchList(
		aggregate: AggregateRoot<unknown, EntityId<unknown>>,
	) {
		DomainEvents.markedAggregates.delete(aggregate);
	}

	/**
	 * Busca um agregado marcado pelo seu ID.
	 *
	 * @private
	 * @param {EntityId<unknown>} id - ID do agregado a ser buscado.
	 * @returns {AggregateRoot<unknown, EntityId<unknown>> | undefined} O agregado encontrado ou undefined se não existir.
	 */
	private static findMarkedAggregateByID(
		id: EntityId<unknown>,
	): AggregateRoot<unknown, EntityId<unknown>> | undefined {
		for (const aggregate of DomainEvents.markedAggregates) {
			if (aggregate.id.equals(id)) {
				return aggregate;
			}
		}

		return undefined;
	}

	/**
	 * Despacha um evento de domínio chamando os callbacks registrados para o seu tipo.
	 *
	 * @private
	 * @param {DomainEvent} event - Evento de domínio a ser despachado.
	 */
	private static dispatch(event: DomainEvent<EntityId<unknown>>) {
		if (!DomainEvents.shouldRun) {
			return;
		}

		const eventClassName = event.constructor.name;

		if (eventClassName in DomainEvents.handlersMap) {
			const handlers = DomainEvents.handlersMap[eventClassName];

			for (const handler of handlers) {
				handler(event);
			}
		}
	}
}
