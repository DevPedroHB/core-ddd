import { Repository } from "@pedrohb/core-ddd";
import { User as UserTypes } from "@pedrohb/types";
import { User } from "../../enterprise/entities/user";

export type UserFields = UserTypes;

export abstract class UserRepository extends Repository<UserFields, User> {}
