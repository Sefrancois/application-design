import { Command } from "@cqrs/write/application-service";

export interface Middleware {
	run(command: Command<unknown>): void;
}
