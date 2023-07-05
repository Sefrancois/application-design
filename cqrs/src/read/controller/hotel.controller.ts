import { NextFunction, Request, Response } from "express";
import { HotelInMemoryDao } from "@cqrs/read/dao/hotel-in-memory.dao";

export class HotelController {
	private readonly hotelDao: HotelInMemoryDao;

	constructor(hotelDao: HotelInMemoryDao) {
		this.hotelDao = hotelDao;
	}

	public getAllRoomsRequest(request: Request, response: Response, next: NextFunction): void {
		const rooms = this.hotelDao.getAllRooms();
		response.status(200).json(rooms).end();
		next();
	}

	public getAvailableRoomsForPeriodRequest(request: Request, response: Response, next: NextFunction): void {
		const startDate = new Date(request.query.startDate as string || "");
		const endDate = new Date(request.query.endDate as string || "");
		const availableRooms = this.hotelDao.getAvailableRooms(startDate, endDate);
		response.status(200).json(availableRooms).end();
		next();
	}
}
