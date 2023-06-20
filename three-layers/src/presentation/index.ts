import { NextFunction, Request, Response } from "express";
import { HotelDao } from "@three-layers/persistance/dao/hotel.dao";
import { HotelService } from "@three-layers/logic/hotel.service";
import { HotelController } from "@three-layers/presentation/hotel.controller";

interface Route {
	method: "get" | "post";
	path: string;
	controller: (request: Request, response: Response, next: NextFunction) => void | Promise<void>;
}

const hotelDao = new HotelDao();
const hotelService = new HotelService(hotelDao);
const hotelController = new HotelController(hotelService);

export const routes: Array<Route> = [
	{
		method: "get",
		path: "/rooms",
		controller: hotelController.getAllRoomsRequest.bind(hotelController),
	},
	{
		method: "get",
		path: "/available-rooms",
		controller: hotelController.getAvailableRoomsForPeriodRequest.bind(hotelController),
	},
	{
		method: "post",
		path: "/book-a-room",
		controller: hotelController.postBookARoomRequest.bind(hotelController),
	},
];
