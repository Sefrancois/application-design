import { RoomModel } from "@cqrs/write/infrastructure/model/room.model";
import { BookingModel } from "@cqrs/write/infrastructure/model/booking.model";

export class HotelModel {
	public readonly rooms: Array<RoomModel>;
	public readonly bookings: Array<BookingModel>;

	constructor(rooms: Array<RoomModel>, bookings: Array<BookingModel>) {
		this.rooms = rooms;
		this.bookings = bookings;
	}
}
