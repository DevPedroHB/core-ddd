import { EntityWithId, Repository } from "@pedrohb/core-ddd";
import {
	INotification,
	Notification,
} from "../../enterprise/entities/notification";

export type NotificationFields = EntityWithId<INotification>;

export abstract class NotificationsRepository extends Repository<
	NotificationFields,
	Notification
> {}
