import { RoomModel } from "@three-layers/persistence/model/room.model";
import { BookingModel } from "@three-layers/persistence/model/booking.model";

export class HotelDao {
	public rooms: Array<RoomModel>;
	public bookings: Array<BookingModel>;

	constructor(rooms?: Array<RoomModel>, bookings?: Array<BookingModel>) {
		rooms
			? this.rooms = rooms
			: this.rooms = [
				new RoomModel(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(102, 1, 4, "2 queen size beds - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(103, 1, 3, "1 queen size bed, 1 single size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(201, 2, 4, "2 queen size beds - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(202, 2, 1, "1 single size bed - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(203, 2, 3, "1 king size bed, 1 single size bed - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(204, 2, 6, "1 king size bed, 2 queen size beds - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(301, 3, 7, "2 king size bed, 1 queen size beds, 1 single size bed - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(302, 3, 2, "1 king size bed - Wi-Fi - private bathroom - wheelchair accessible"),
			]

		bookings
			? this.bookings = bookings
			: this.bookings = [
				new BookingModel(102, new Date("2023-06-01"), new Date("2023-06-05"))
			];
	}

	public fetchAllRooms(): Array<RoomModel> {
		return this.rooms;
	}

	public fetchAllBookings(): Array<BookingModel> {
		return this.bookings;
	}

	public addBooking(booking: BookingModel): void {
		this.bookings.push(booking);
	}
}
