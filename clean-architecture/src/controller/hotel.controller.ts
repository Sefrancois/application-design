import { NextFunction, Request, Response } from "express";
import { DisplayAllRooms } from "@clean-architecture/usecase/display-all-rooms/display-all-rooms.usecase";
import {
	DisplayAllAvailableRoomsForPeriod,
} from "@clean-architecture/usecase/display-available-rooms-for-period/display-all-available-rooms-for-period.usecase";
import { BookARoom } from "@clean-architecture/usecase/book-a-room/book-a-room.usecase";

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
		response.status(200).send(rooms).end();
		next();
	}

	public getAvailableRoomsForPeriodRequest(request: Request, response: Response, next: NextFunction): void {
		const startDate = new Date(request.query.startDate as string || "");
		const endDate = new Date(request.query.endDate as string || "");
		const availableRooms = this.displayAllAvailableRoomsForPeriod.run(startDate, endDate);
		response.status(200).send(availableRooms).end();
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

