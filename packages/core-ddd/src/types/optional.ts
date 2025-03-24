import type { PartialPick } from "./partial-pick";

export type Optional<T, K extends keyof T> = PartialPick<T, K> & Omit<T, K>;
