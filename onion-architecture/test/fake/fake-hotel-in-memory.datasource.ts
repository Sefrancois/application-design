import { HotelDatasource } from "@onion-architecture/domain/service/hotel.datasource";
import { HotelModel } from "@onion-architecture/infrastructure/model/hotel.model";
import { RoomModel } from "@onion-architecture/infrastructure/model/room.model";
import { BookingModel } from "@onion-architecture/infrastructure/model/booking.model";
import { Hotel } from "@onion-architecture/domain/model/hotel";

export class FakeHotelInMemoryDatasource implements HotelDatasource {
	private hotel: HotelModel;

	constructor() {
		const rooms = [
			new RoomModel(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(102, 1, 4, "2 queen size beds - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
		];

		const bookings = [
			new BookingModel(102, new Date("2023-06-01"), new Date("2023-06-05")),
		];

		this.hotel = new HotelModel(rooms, bookings);
	}

	public addABooking(hotel: Hotel): void {
		this.hotel = new HotelModel(hotel.getAllRooms(), hotel.getAllBookings());
	}

	public getHotel(): Hotel {
		return new Hotel(this.hotel.rooms, this.hotel.bookings);
	}
}
