import type { Entity } from "@/entities/entity";
import type { EntityId } from "@/interfaces/entity-id";
import type { IdOf } from "./id-of";
import type { PropsOf } from "./props-of";

/**
 * Representa o tipo completo de dados de uma entidade, incluindo suas propriedades e o identificador.
 *
 * @template E - Entidade que estende Entity com propriedades e identificador.
 *
 * @example
 * ```ts
 * interface UserProps { name: string; age: number; }
 * class User extends Entity<UserProps, UserId> {}
 *
 * // Tipo resultante:
 * type FullUser = EntityOf<User>; // { name: string; age: number; id: UserId }
 *
 * const u: FullUser = {
 *   name: "Ana",
 *   age: 25,
 *   id: someUserId
 * };
 * ```
 */
export type EntityOf<E extends Entity<unknown, EntityId<unknown>>> =
	PropsOf<E> & {
		id: IdOf<E>;
	};
