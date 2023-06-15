import { NextFunction, Request, Response } from "express";
import { HotelService } from "@three-layers/logic/hotel.service";

export class HotelController {
	private readonly hotelService: HotelService;

	constructor(hotelService: HotelService) {
		this.hotelService = hotelService;
	}

	public getAllRoomsRequest(request: Request, response: Response, next: NextFunction): void {
		const rooms = this.hotelService.getAllRooms();
		response.status(200).json(rooms).end();
		next();
	}

	public getAvailableRoomsForPeriodRequest(request: Request, response: Response, next: NextFunction): void {
		const startDate = new Date(request.query.startDate as string|| "");
		const endDate = new Date(request.query.endDate as string|| "");
		const availableRooms = this.hotelService.getAllAvailableRoomsForPeriod(startDate, endDate);
		response.status(200).json(availableRooms).end();
		next();
	}

	public postBookARoomRequest(request: Request, response: Response, next: NextFunction): void {
		const startDate = new Date(request.body.startDate as string|| "");
		const endDate = new Date(request.body.endDate as string|| "");
		const roomNumber = request.body.roomNumber;

		const operationResult = this.hotelService.bookARoom(roomNumber, startDate, endDate);

		operationResult.isFailure
			? response.status(400).json({ message: operationResult.value!.message, stack: operationResult.value!.stack }).end()
			: response.status(201).send().end();

		next();
	}
}

