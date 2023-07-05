import { Result } from "@sefr/result";
import { EventPublisher } from "@cqrs/write/infrastructure/event/event-publisher";
import { Middleware } from "@cqrs/write/infrastructure/middleware/middleware";
import { Command, CommandHandler } from "@cqrs/write/application-service";
import { Event } from "@cqrs/write/domain/model/event";

export class CommandBus {
	private readonly eventPublisher: EventPublisher;
	private middlewares: Array<Middleware>;
	private handlers: Map<string, CommandHandler<Command<unknown>>>;

	constructor(eventPublisher: EventPublisher) {
		this.eventPublisher = eventPublisher;
		this.middlewares = new Array<Middleware>();
		this.handlers = new Map<string, CommandHandler<Command<unknown>>>();
	}

	public dispatch(command: Command<unknown>): Result<unknown> {
		const result = this.runWithHandler(command);
		this.runMiddlewares(command);
		return result;
	}

	public registerMiddlewares(middlewares: Array<Middleware>): void {
		this.middlewares = this.middlewares.concat(middlewares);
	}

	public registerHandler(command: Command<unknown>, commandHandler: CommandHandler<Command<unknown>>): void {
		const commandName = command.toString();

		if (this.isHandlerRegisteredForCommand(commandName)) {
			throw new Error(`Command ${commandName} has already one registered command handler`);
		}

		this.handlers.set(commandName, commandHandler);
	}

	private runWithHandler(command: Command<unknown>): Result<unknown> {
		const commandName = command.constructor.name;
		let result: Result<unknown>;

		if (this.isHandlerRegisteredForCommand(commandName)) {
			result = this.handlers.get(commandName)!.handle(command);
			this.publishEventIfSuccess(result);
		} else {
			result = Result.failure(new Error(`Unable to find command handler for command ${commandName}`));
		}

		return result;
	}

	private isHandlerRegisteredForCommand(commandName: string): boolean {
		return this.handlers.has(commandName);
	}

	private publishEventIfSuccess(result: Result<unknown>): void {
		if (!result.isFailure) {
			this.eventPublisher.publish(<Event<unknown>>result.value);
		}
	}

	private runMiddlewares(command: Command<unknown>): void {
		this.middlewares.forEach((middleware) => middleware.run(command));
	}
}
