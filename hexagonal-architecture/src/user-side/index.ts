import { NextFunction, Request, Response } from "express";
import { HotelSecondaryAdapter } from "@hexagonal-architecture/server-side/adapter/hotel.secondary-adapter";
import { HotelPrimaryAdapter } from "@hexagonal-architecture/user-side/hotel.primary-adapter";

interface Route {
	method: "get" | "post";
	path: string;
	controller: (request: Request, response: Response, next: NextFunction) => void | Promise<void>;
}

const hotelSecondaryAdapter = new HotelSecondaryAdapter();
const hotelPrimaryAdapter = new HotelPrimaryAdapter(hotelSecondaryAdapter);

export const routes: Array<Route> = [
	{
		method: "get",
		path: "/rooms",
		controller: hotelPrimaryAdapter.getAllHotelRooms.bind(hotelPrimaryAdapter),
	},
	{
		method: "get",
		path: "/available-rooms",
		controller: hotelPrimaryAdapter.getAllAvailableHotelRoomsForPeriod.bind(hotelPrimaryAdapter)
	},
	{
		method: "post",
		path: "/book-a-room",
		controller: hotelPrimaryAdapter.postBookARoom.bind(hotelPrimaryAdapter)
	},
];
