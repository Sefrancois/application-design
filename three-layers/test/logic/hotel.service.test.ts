import { expect } from "@sefr/test";
import { HotelService } from "@three-layers/logic/hotel.service";
import { RoomModel } from "@three-layers/persistence/model/room.model";
import { HotelDao } from "@three-layers/persistence/dao/hotel.dao";
import { BookingModel } from "@three-layers/persistence/model/booking.model";

let startDate: Date;
let endDate: Date;
let hotelDao: HotelDao;
let hotelService: HotelService;

describe("Three-Layers | HotelServiceTest", () => {
	beforeEach(() => {
		// Given
		hotelDao = new HotelDao([
			new RoomModel(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(102, 1, 4, "2 queen size beds - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
		]);
		startDate = new Date("2023-06-01");
		endDate = new Date("2023-06-08");
		hotelService = new HotelService(hotelDao);
	});

	it("get all rooms", () => {
		// When
		const result = hotelService.getAllRooms();

		// Then
		const expected = [
			new RoomModel(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
			new RoomModel(102, 1, 4, "2 queen size beds - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
		];
		expect(result).to.have.deep.members(expected);
	});

	it("get all available rooms for a given period", () => {
		// When
		const result = hotelService.getAllAvailableRoomsForPeriod(startDate, endDate);

		// Then
		const expected = [
			new RoomModel(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
		];
		expect(result).to.have.deep.members(expected);
	});

	context("when someone book a room", () => {
		context("and the room is free for a given period", () => {
			it("book the room for a period", () => {
				// Given
				const roomNumber = 101;

				// When
				const result = hotelService.bookARoom(roomNumber, startDate, endDate);

				// Then
				expect(result.isFailure).to.be.false;
				expect(hotelDao.fetchAllBookings()).to.have.deep.members([
					new BookingModel(102, new Date("2023-06-01"), new Date("2023-06-05")),
					new BookingModel(roomNumber, startDate, endDate),
				]);
			});
		});

		context("and the room is booked for a given period", () => {
			it("does not book the room", () => {
				// Given
				const roomNumber = 102;

				// When
				const result = hotelService.bookARoom(roomNumber, startDate, endDate);

				// Then
				expect(result.isFailure).to.be.true;
				expect(result.value).to.eql(new Error("It seems the room you wanted to book is not available for this period"));
				expect(hotelDao.fetchAllBookings()).to.have.deep.members([
					new BookingModel(102, new Date("2023-06-01"), new Date("2023-06-05")),
				]);
			});
		});
	});
});
