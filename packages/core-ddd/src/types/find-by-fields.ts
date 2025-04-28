import type { Entity } from "@/entities/entity";
import type { EntityId } from "@/interfaces/entity-id";
import type { EntityOf } from "./entity-of";

/**
 * Tipo para representar filtros de busca por campos completos de uma entidade.
 * Permite especificar qualquer subconjunto das propriedades e do identificador de E.
 *
 * @template E - Tipo de entidade que estende Entity com propriedades e identificador.
 *
 * @example
 * ```ts
 * interface UserProps { name: string; age: number; }
 * class User extends Entity<UserProps, UserId> {}
 *
 * // Exemplo de filtros:
 * const filtro1: FindByFields<User> = { name: "Carlos" };
 * const filtro2: FindByFields<User> = { id: someUserId };
 * const filtro3: FindByFields<User> = { name: "Ana", age: 28, id: anotherUserId };
 * ```
 */
export type FindByFields<E extends Entity<unknown, EntityId<unknown>>> =
	Partial<EntityOf<E>>;
