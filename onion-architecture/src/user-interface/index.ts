import { NextFunction, Request, Response } from "express";
import { HotelInMemoryDatasource } from "@onion-architecture/infrastructure/gateway/hotel-in-memory.datasource";
import { DisplayAllRooms } from "@onion-architecture/application-service/display-all-rooms.usecase";
import {
	DisplayAllAvailableRoomsForPeriod,
} from "@onion-architecture/application-service/display-all-available-rooms-for-period.usecase";
import { BookARoom } from "@onion-architecture/application-service/book-a-room.usecase";
import { HotelController } from "@onion-architecture/user-interface/controller/hotel.controller";

interface Route {
	method: "get" | "post";
	path: string;
	controller: (request: Request, response: Response, next: NextFunction) => void | Promise<void>;
}

const hotelDatasource = new HotelInMemoryDatasource();
const displayAllRooms = new DisplayAllRooms(hotelDatasource);
const displayAllAvailableRooms = new DisplayAllAvailableRoomsForPeriod(hotelDatasource);
const bookARoom = new BookARoom(hotelDatasource);
const hotelController = new HotelController(displayAllRooms, displayAllAvailableRooms, bookARoom);

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
