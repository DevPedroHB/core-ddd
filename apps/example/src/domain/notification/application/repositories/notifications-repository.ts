import { Repository } from "@pedrohb/core-ddd";
import { Notification } from "../../enterprise/entities/notification";

export abstract class NotificationsRepository extends Repository<Notification> {}
