/**
 * Combina as propriedades de um objeto com um identificador único.
 *
 * @template T - Tipo base do objeto.
 */
export type EntityWithId<T> = T & {
	id: string;
};
