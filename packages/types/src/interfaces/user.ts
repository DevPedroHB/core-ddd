import type { NullableToOptional } from "@pedrohb/core-ddd";
import type { User as IUser } from "@pedrohb/database";

export interface User extends NullableToOptional<IUser> {}
