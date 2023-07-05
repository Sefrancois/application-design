import { Event } from "@cqrs/write/domain/model/event";

export interface EventListener {
	listen(event: Event<unknown>): void;
}
