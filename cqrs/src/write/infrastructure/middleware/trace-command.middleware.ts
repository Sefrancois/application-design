import { Middleware } from "@cqrs/write/infrastructure/middleware/middleware";
import { Command } from "@cqrs/write/application-service";

export class TraceCommandMiddleware implements Middleware {
	public run(command: Command<unknown>): void {
		console.log(command);
	}
}
