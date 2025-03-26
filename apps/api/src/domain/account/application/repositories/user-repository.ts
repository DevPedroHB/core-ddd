import { EntityTypeWithId, Repository } from "@pedrohb/core-ddd";
import { IUser, User } from "../../enterprise/entities/user";

export type UserRepositoryType = EntityTypeWithId<IUser>;

export abstract class UserRepository extends Repository<
	UserRepositoryType,
	User
> {}
