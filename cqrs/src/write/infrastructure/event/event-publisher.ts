import { EventListener } from "@cqrs/write/infrastructure/event/event-listener";
import { Event } from "@cqrs/write/domain/model/event";

export interface EventPublisher {
	publish(event: Event<unknown>): void;
	subscribe(listener: EventListener): void;
}

export class InternalEventPublisher implements EventPublisher {
	private readonly listeners: Set<EventListener>;

	constructor() {
		this.listeners = new Set();
	}

	public publish(event: Event<unknown>): void {
		this.listeners.forEach((listener) => {
			listener.listen(event);
		});
	}

	public subscribe(listener: EventListener): void {
		this.listeners.add(listener);
	}
}
