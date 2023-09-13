import { Result } from "@sefr/result";
import { Room } from "@clean-architecture/domain/entities/room";
import { Booking } from "@clean-architecture/domain/entities/booking";

export class Hotel {
	private readonly rooms: Array<Room>;
	private readonly bookings: Array<Booking>;

	constructor(rooms: Array<Room>, bookings: Array<Booking>) {
		this.rooms = rooms;
		this.bookings = bookings;
	}

	public getAllRooms(): Array<Room> {
		return this.rooms;
	}

	public getAllBookings(): Array<Booking> {
		return this.bookings;
	}

	public getAllAvailableRoomsForPeriod(startDate: Date, endDate: Date): Array<Room> {
		const bookedRoomsForGivenPeriod = this.bookings
			.filter(this.overlapsPeriod(startDate, endDate))
			.map((booking) => booking.roomNumber);

		return this.rooms.filter((room) => !bookedRoomsForGivenPeriod.includes(room.number));
	}

	public bookARoom(roomNumber: number, startDate: Date, endDate: Date): Result<void> {
		if (this.getAllAvailableRoomsForPeriod(startDate, endDate).map((room) => room.number).includes(roomNumber)) {
			this.bookings.push(new Booking(roomNumber, startDate, endDate));
			return Result.ok();
		}
		return Result.failure(new Error("It seems the room you wanted to book is not available for this period"));
	}

	private overlapsPeriod(startDate: Date, endDate: Date): (booking: Booking) => boolean {
		return (booking: Booking) => {
			const bookingStartDate = booking.startDate.getTime();
			const bookingEndDate = booking.endDate.getTime();
			const periodStartDate = startDate.getTime();
			const periodEndDate = endDate.getTime();

			return (bookingStartDate >= periodStartDate && bookingStartDate <= periodEndDate)
				|| (bookingEndDate >= periodStartDate && bookingEndDate <= periodEndDate);
		};
	}
}
