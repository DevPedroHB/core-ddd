import type { Entity } from "@/entities/entity";
import type { EntityId } from "@/interfaces/entity-id";

/**
 * Extrai o tipo de propriedades de uma entidade.
 *
 * @template E - Tipo da entidade que implementa Entity<P, EntityId>.
 * @returns O tipo P de propriedades da entidade E, ou never se E não for compatível.
 *
 * @example
 * ```ts
 * interface UserProps { name: string; }
 * class User extends Entity<UserProps, UserId> {}
 * type P = PropsOf<User>; // UserProps
 * ```
 */
export type PropsOf<E> = E extends Entity<infer P, EntityId<unknown>>
	? P
	: never;
