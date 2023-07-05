import { Result } from "@sefr/result";
import { Event } from "@cqrs/write/domain/model/event";

export abstract class Command<T> {
}

export interface CommandHandler<T extends Command<unknown>> {
	handle(command: Command<T>): Result<Event<unknown> | Error>;
}
