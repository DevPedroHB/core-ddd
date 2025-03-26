import type { NullableToOptional } from "@pedrohb/core-ddd";
import type { Post as IPost } from "@pedrohb/database";

export interface Post extends NullableToOptional<IPost> {}
