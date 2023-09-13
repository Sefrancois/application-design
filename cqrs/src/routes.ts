import { NextFunction, Request, Response } from "express";
import { HotelInMemoryDatasource } from "@cqrs/write/infrastructure/gateway/hotel-in-memory.datasource";
import { BookARoomCommandHandler } from "@cqrs/write/application-service/book-a-room/book-a-room.command-handler";
import { HotelController as HotelWriteController } from "@cqrs/write/user-interface/controller/hotel.controller";
import { HotelController as HotelReadController } from "@cqrs/read/controller/hotel.controller";
import { CommandBus } from "@cqrs/write/infrastructure/bus/command-bus";
import { InternalEventPublisher } from "@cqrs/write/infrastructure/event/event-publisher";
import { BookARoomCommand } from "@cqrs/write/application-service/book-a-room/book-a-room.command";
import { TraceCommandMiddleware } from "@cqrs/write/infrastructure/middleware/trace-command.middleware";
import { HotelInMemoryDao } from "@cqrs/read/dao/hotel-in-memory.dao";
import { ProjectBookingEventListener } from "@cqrs/project/project-booking.event-listener";

interface Route {
	method: "get" | "post";
	path: string;
	controller: (request: Request, response: Response, next: NextFunction) => void | Promise<void>;
}

const eventPublisher = new InternalEventPublisher();

const commandBus = new CommandBus(eventPublisher);
const traceCommandMiddleware = new TraceCommandMiddleware();
const hotelDatasource = new HotelInMemoryDatasource();
const bookARoom = new BookARoomCommandHandler(hotelDatasource);
const hotelInMemoryDao = new HotelInMemoryDao();
const hotelReadController = new HotelReadController(hotelInMemoryDao);

const bookedRoomEventListener = new ProjectBookingEventListener(hotelInMemoryDao);

eventPublisher.subscribe(bookedRoomEventListener);
commandBus.registerHandler(BookARoomCommand.name, bookARoom);
commandBus.registerMiddlewares([traceCommandMiddleware]);


const hotelWriteController = new HotelWriteController(commandBus);

export const routes: Array<Route> = [
	{
		method: "post",
		path: "/book-a-room",
		controller: hotelWriteController.postBookARoomRequest.bind(hotelWriteController),
	},
	{
		method: "get",
		path: "/rooms",
		controller: hotelReadController.getAllRoomsRequest.bind(hotelReadController),
	},
	{
		method: "get",
		path: "/available-rooms",
		controller: hotelReadController.getAvailableRoomsForPeriodRequest.bind(hotelReadController),
	},
];
