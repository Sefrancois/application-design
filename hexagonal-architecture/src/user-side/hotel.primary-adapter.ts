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
			endDate: new Date(request.query.endDate as string || ""),
		};
		const hotel = this.hotelSecondaryPort.getHotel();
		response.status(200).json(hotel.getAllAvailableRoomsForPeriod(startDate, endDate));
		next();
	}

	public postBookARoom(request: Request, response: Response, next: NextFunction): void {
		const body = <{roomNumber: number, startDate: string, endDate: string}>request.body;
		const { roomNumber, startDate, endDate } = {
			roomNumber: body.roomNumber,
			startDate: new Date(body.startDate || ""),
			endDate: new Date(body.endDate || ""),
		};
		const hotel = this.hotelSecondaryPort.getHotel();
		const operationResult = hotel.bookARoom(roomNumber, startDate, endDate);

		operationResult.isFailure
			? response.status(400).json({ message: (<Error>operationResult.value).message, stack: (<Error>operationResult.value).stack }).end()
			: response.status(202).json().end();

		next();
	}
}
