import { Result } from "@sefr/result";
import { Room } from "@cqrs/write/domain/model/room";
import { Booking } from "@cqrs/write/domain/model/booking";
import { RoomBookedEvent } from "@cqrs/write/domain/model/room-booked.event";

export class Hotel {
	public rooms: Array<Room>;
	public bookings: Array<Booking>;

	constructor(rooms: Array<Room>, bookings: Array<Booking>) {
		this.rooms = rooms;
		this.bookings = bookings;
	}

	public bookARoom(roomNumber: number, startDate: Date, endDate: Date): Result<RoomBookedEvent | Error> {
		if (this.getAllAvailableRoomsForPeriod(startDate, endDate).map((room) => room.number).includes(roomNumber)) {
			this.bookings.push(new Booking(roomNumber, startDate, endDate));
			return Result.ok(new RoomBookedEvent(new Date(), { startDate, endDate, roomNumber }));
		}
		return Result.failure(new Error("It seems the room you wanted to book is not available for this period"));
	}

	private getAllAvailableRoomsForPeriod(startDate: Date, endDate: Date): Array<Room> {
		const bookedRoomsForGivenPeriod = this.bookings
			.filter(this.overlapsPeriod(startDate, endDate))
			.map((booking) => booking.roomNumber);

		return this.rooms.filter((room) => !bookedRoomsForGivenPeriod.includes(room.number));
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
