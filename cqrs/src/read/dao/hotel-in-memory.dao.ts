import { BookingModel } from "@cqrs/read/model/booking.model";
import { RoomModel } from "@cqrs/read/model/room.model";

export class HotelInMemoryDao {
	private readonly rooms: Array<RoomModel>;
	private bookings: Array<BookingModel>;

	constructor(rooms?: Array<RoomModel>, bookings?: Array<BookingModel>) {
		rooms
			? this.rooms = rooms
			: this.rooms = [
				new RoomModel(101, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(102, 4, "2 queen size beds - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(103, 3, "1 queen size bed, 1 single size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(201, 4, "2 queen size beds - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(202, 1, "1 single size bed - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(203, 3, "1 king size bed, 1 single size bed - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(204, 6, "1 king size bed, 2 queen size beds - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(301, 7, "2 king size bed, 1 queen size beds, 1 single size bed - Wi-Fi - private bathroom - wheelchair accessible"),
				new RoomModel(302, 2, "1 king size bed - Wi-Fi - private bathroom - wheelchair accessible"),
			];

		bookings
			? this.bookings = bookings
			: this.bookings = [new BookingModel(102, new Date("2023-06-01"), new Date("2023-06-05"))];
	}

	public update(booking: BookingModel): void {
		this.bookings.push(booking);
	}

	public getAvailableRooms(startDate: Date, endDate: Date): Array<RoomModel> {
		return this.getAllAvailableRoomsForPeriod(startDate, endDate);
	}

	public getAllRooms(): Array<RoomModel> {
		return this.rooms;
	}

	private getAllAvailableRoomsForPeriod(startDate: Date, endDate: Date): Array<RoomModel> {
		const bookedRoomsForGivenPeriod = this.bookings
			.filter(this.overlapsPeriod(startDate, endDate))
			.map((booking) => booking.roomNumber);

		return this.rooms.filter((room) => !bookedRoomsForGivenPeriod.includes(room.number));
	}

	private overlapsPeriod(startDate: Date, endDate: Date): (booking: BookingModel) => boolean {
		return (booking: BookingModel) => {
			const bookingStartDate = booking.startDate.getTime();
			const bookingEndDate = booking.endDate.getTime();
			const periodStartDate = startDate.getTime();
			const periodEndDate = endDate.getTime();

			return (bookingStartDate >= periodStartDate && bookingStartDate <= periodEndDate)
				|| (bookingEndDate >= periodStartDate && bookingEndDate <= periodEndDate);
		};
	}
}
