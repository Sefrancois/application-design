import { HotelDatasource } from "@clean-architecture/usecase/hotel.datasource";
import { HotelModel } from "@clean-architecture/gateway/model/hotel.model";
import { RoomModel } from "@clean-architecture/gateway/model/room.model";
import { BookingModel } from "@clean-architecture/gateway/model/booking.model";
import { Hotel } from "@clean-architecture/entities/hotel";

export class HotelInMemoryDatasource implements HotelDatasource {
	private hotel: HotelModel;

	constructor() {
		const rooms = [
			new RoomModel(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(102, 1, 4, "2 queen size beds - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(103, 1, 3, "1 queen size bed, 1 single size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(201, 2, 4, "2 queen size beds - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(202, 2, 1, "1 single size bed - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(203, 2, 3, "1 king size bed, 1 single size bed - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(204, 2, 6, "1 king size bed, 2 queen size beds - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(301, 3, 7, "2 king size bed, 1 queen size beds, 1 single size bed - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(302, 3, 2, "1 king size bed - Wi-Fi - private bathroom - wheelchair accessible"),
		];

		const bookings = [
			new BookingModel(102, new Date("2023-06-01"), new Date("2023-06-05")),
		];

		this.hotel = new HotelModel(rooms, bookings)
	}

	public addABooking(hotel: Hotel): void {
		this.hotel = new HotelModel(hotel.getAllRooms(), hotel.getAllBookings());
	}

	public getHotel(): Hotel {
		return new Hotel(this.hotel.rooms, this.hotel.bookings);
	}
}
