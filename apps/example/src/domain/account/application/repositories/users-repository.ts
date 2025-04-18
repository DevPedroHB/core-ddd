import { Repository, UniqueEntityId } from "@pedrohb/core-ddd";
import { IUser, User } from "../../enterprise/entities/user";

export type UserFields = IUser & {
	id: UniqueEntityId;
};

export abstract class UsersRepository extends Repository<UserFields, User> {}
