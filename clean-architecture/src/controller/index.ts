import { NextFunction, Request, Response } from "express";
import { RoomsXmlPresenter } from "@clean-architecture/presenter/rooms-xml.presenter";
import { HotelInMemoryDatasource } from "@clean-architecture/gateway/datasource/hotel-in-memory.datasource";
import { DisplayAllRooms } from "@clean-architecture/usecase/display-all-rooms/display-all-rooms.usecase";
import {
	DisplayAllAvailableRoomsForPeriod,
} from "@clean-architecture/usecase/display-available-rooms-for-period/display-all-available-rooms-for-period.usecase";
import { BookARoom } from "@clean-architecture/usecase/book-a-room/book-a-room.usecase";
import { HotelController } from "@clean-architecture/controller/hotel.controller";

interface Route {
	method: "get" | "post";
	path: string;
	controller: (request: Request, response: Response, next: NextFunction) => void | Promise<void>;
}

const roomsPresenter = new RoomsXmlPresenter();
const hotelDatasource = new HotelInMemoryDatasource();
const displayAllRooms = new DisplayAllRooms(hotelDatasource, roomsPresenter);
const displayAllAvailableRooms = new DisplayAllAvailableRoomsForPeriod(hotelDatasource, roomsPresenter);
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
