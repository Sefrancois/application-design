import { Result } from "@sefr/result";
import { RoomModel } from "@three-layers/persistence/model/room.model";
import { HotelDao } from "@three-layers/persistence/dao/hotel.dao";
import { BookingModel } from "@three-layers/persistence/model/booking.model";

export class HotelService {
	private readonly hotelDao: HotelDao;

	constructor(hotelDao: HotelDao) {
		this.hotelDao = hotelDao;
	}

	public getAllRooms(): Array<RoomModel> {
		return this.hotelDao.fetchAllRooms();
	}

	public getAllAvailableRoomsForPeriod(startDate: Date, endDate: Date): Array<RoomModel> {
		const rooms = this.hotelDao.fetchAllRooms();
		const bookings = this.hotelDao.fetchAllBookings();

		const bookedRoomsForGivenPeriod = bookings
			.filter(this.overlapsPeriod(startDate, endDate))
			.map((booking) => booking.roomNumber);

		return rooms.filter((room) => !bookedRoomsForGivenPeriod.includes(room.number));
	}

	public bookARoom(roomNumber: number, startDate: Date, endDate: Date): Result<void> {
		if (this.getAllAvailableRoomsForPeriod(startDate, endDate).map((room) => room.number).includes(roomNumber)) {
			this.hotelDao.addBooking(new BookingModel(roomNumber, startDate, endDate));
			return Result.ok();
		}
		return Result.failure(new Error("It seems the room you wanted to book is not available for this period"));
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
