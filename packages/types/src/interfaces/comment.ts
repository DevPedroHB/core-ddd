import type { NullableToOptional } from "@pedrohb/core-ddd";
import type { Comment as IComment } from "@pedrohb/database";

export interface Comment extends NullableToOptional<IComment> {}
