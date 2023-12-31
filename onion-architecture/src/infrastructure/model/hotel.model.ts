import { RoomModel } from "@onion-architecture/infrastructure/model/room.model";
import { BookingModel } from "@onion-architecture/infrastructure/model/booking.model";

export class HotelModel {
	public readonly rooms: Array<RoomModel>;
	public readonly bookings: Array<BookingModel>;

	constructor(rooms: Array<RoomModel>, bookings: Array<BookingModel>) {
		this.rooms = rooms;
		this.bookings = bookings;
	}
}
