import { NextFunction, Request, Response } from "express";
import { HotelPrimaryPort } from "@hexagonal-architecture/core/port/hotel.primary-port";
import { HotelSecondaryPort } from "@hexagonal-architecture/core/port/hotel.secondary-port";

export class HotelPrimaryAdapter implements HotelPrimaryPort {
	private readonly hotelSecondaryPort: HotelSecondaryPort;

	constructor(hotelSecondaryPort: HotelSecondaryPort) {
		this.hotelSecondaryPort = hotelSecondaryPort;
	}

	public getAllHotelRooms(request: Request, response: Response, next: NextFunction): void {
		const hotel = this.hotelSecondaryPort.getHotel();
		response.status(200).json(hotel.getAllRooms()).end();
		next();
	}

	public getAllAvailableHotelRoomsForPeriod(request: Request, response: Response, next: NextFunction): void {
		const { startDate, endDate } = {
			startDate: new Date(request.query.startDate as string || ""),
			endDate: new Date(request.query.endDate as string || "")
		};
		const hotel = this.hotelSecondaryPort.getHotel();
		response.status(200).json(hotel.getAllAvailableRoomsForPeriod(startDate, endDate))
	}

	public postBookARoom(request: Request, response: Response, next: NextFunction): void {
		const { roomNumber, startDate, endDate } = {
			roomNumber: request.body.roomNumber,
			startDate: new Date(request.body.startDate as string || ""),
			endDate: new Date(request.body.endDate as string || "")
		};
		const hotel = this.hotelSecondaryPort.getHotel();
		const operationResult = hotel.bookARoom(roomNumber, startDate, endDate);

		operationResult.isFailure
			? response.status(400).json({ message: operationResult.value!.message, stack: operationResult.value!.stack }).end()
			: response.status(202).json().end();
	}
}
