import type { NullableToOptional } from "@pedrohb/core-ddd";
import type { Notification as INotification } from "@pedrohb/database";

export interface Notification extends NullableToOptional<INotification> {}
