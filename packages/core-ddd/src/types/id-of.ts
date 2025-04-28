import type { Entity } from "@/entities/entity";

/**
 * Extrai o tipo do identificador (ID) de uma entidade.
 *
 * @template E - Tipo da entidade que implementa Entity<unknown, ID>.
 * @returns O tipo ID da entidade E, ou never se E não for compatível.
 *
 * @example
 * ```ts
 * interface UserProps { name: string; }
 * class User extends Entity<UserProps, UserId> {}
 * type I = IdOf<User>; // UserId
 * ```
 */
export type IdOf<E> = E extends Entity<unknown, infer ID> ? ID : never;
