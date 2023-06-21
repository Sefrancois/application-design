import { NextFunction, Request, Response } from "express";
import { DisplayAllRooms } from "@onion-architecture/application-service/display-all-rooms.usecase";
import {
	DisplayAllAvailableRoomsForPeriod,
} from "@onion-architecture/application-service/display-all-available-rooms-for-period.usecase";
import { BookARoom } from "@onion-architecture/application-service/book-a-room.usecase";

export class HotelController {
	private readonly displayAllRooms: DisplayAllRooms;
	private readonly displayAllAvailableRoomsForPeriod: DisplayAllAvailableRoomsForPeriod;
	private readonly bookARoom: BookARoom;

	constructor(displayAllRooms: DisplayAllRooms, displayAllAvailableRoomsForPeriod: DisplayAllAvailableRoomsForPeriod, bookARoom: BookARoom) {
		this.displayAllRooms = displayAllRooms;
		this.displayAllAvailableRoomsForPeriod = displayAllAvailableRoomsForPeriod;
		this.bookARoom = bookARoom;
	}

	public getAllRoomsRequest(request: Request, response: Response, next: NextFunction): void {
		const rooms = this.displayAllRooms.run();
		response.status(200).json(rooms).end();
		next();
	}

	public getAvailableRoomsForPeriodRequest(request: Request, response: Response, next: NextFunction): void {
		const startDate = new Date(request.query.startDate as string || "");
		const endDate = new Date(request.query.endDate as string || "");
		const availableRooms = this.displayAllAvailableRoomsForPeriod.run(startDate, endDate);
		response.status(200).json(availableRooms).end();
		next();
	}

	public postBookARoomRequest(request: Request, response: Response, next: NextFunction): void {
		const body = <{ roomNumber: number, startDate: string, endDate: string }>request.body;
		const { roomNumber, startDate, endDate } = {
			roomNumber: body.roomNumber,
			startDate: new Date(body.startDate || ""),
			endDate: new Date(body.endDate || ""),
		};

		const operationResult = this.bookARoom.run(roomNumber, startDate, endDate);

		operationResult.isFailure
			? response.status(400).json({ message: (<Error>operationResult.value).message, stack: (<Error>operationResult.value).stack }).end()
			: response.status(202).send().end();

		next();
	}
}

