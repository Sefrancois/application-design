import { Room } from "@hexagonal-architecture/core/room";
import { Booking } from "@hexagonal-architecture/core/booking";
import { BookingModel } from "@hexagonal-architecture/server-side/model/booking.model";
import { RoomModel } from "@hexagonal-architecture/server-side/model/room.model";

export class HotelModel {
	public readonly rooms: Array<RoomModel>;
	public readonly bookings: Array<BookingModel>;

	constructor(rooms: Array<Room>, bookings: Array<Booking>) {
		this.rooms = rooms;
		this.bookings = bookings;
	}
}
