import { NextFunction, Request, Response } from "express";
import { BookARoomCommand } from "@cqrs/write/application-service/book-a-room/book-a-room.command";
import { CommandBus } from "@cqrs/write/infrastructure/bus/command-bus";
import { BookARoomDto } from "@cqrs/write/user-interface/dto/book-a-room.dto";

export class HotelController {
	private readonly commandBus: CommandBus;

	constructor(commandBus: CommandBus) {
		this.commandBus = commandBus;
	}

	public postBookARoomRequest(request: Request, response: Response, next: NextFunction): void {
		const body = <BookARoomDto>request.body;
		const { roomNumber, startDate, endDate } = {
			roomNumber: body.roomNumber,
			startDate: new Date(body.startDate || ""),
			endDate: new Date(body.endDate || ""),
		};

		const bookARoomCommand = new BookARoomCommand(roomNumber, startDate, endDate);
		const operationResult = this.commandBus.dispatch(bookARoomCommand);

		operationResult.isFailure
			? response.status(400).json({ message: (<Error>operationResult.value).message, stack: (<Error>operationResult.value).stack }).end()
			: response.status(202).send().end();

		next();
	}
}
