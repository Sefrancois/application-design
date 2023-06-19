import { expect } from "@sefr/test";
import { Hotel } from "@hexagonal-architecture/core/hotel";
import { Room } from "@hexagonal-architecture/core/room";
import { Booking } from "@hexagonal-architecture/core/booking";

let startDate: Date;
let endDate: Date;
let hotel: Hotel;

describe("HotelTest", () => {
	beforeEach(() => {
		// Given
		startDate = new Date("2023-06-01");
		endDate = new Date("2023-06-05");
		hotel = new Hotel(
			[
				new Room(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
				new Room(102, 1, 4, "2 queen size beds - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
			],
			[new Booking(102, startDate, endDate)]
		);
	});

	it("get all rooms", () => {
		// When
		const result = hotel.getAllRooms();

		// Then
		const expected = [
			new Room(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
			new Room(102, 1, 4, "2 queen size beds - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
		];
		expect(result).to.have.deep.members(expected);
	});

	it("get all available rooms for a given period", () => {
		// When
		const result = hotel.getAllAvailableRoomsForPeriod(startDate, endDate);

		// Then
		const expected = [
			new Room(101, 1, 2, "1 king size bed - A/C - Wi-Fi - private bathroom - wheelchair accessible"),
		];
		expect(result).to.have.deep.members(expected);
	});

	context("when someone book a room", () => {
		context("and the room is free for a given period", () => {
			it("book the room for a period", () => {
				// Given
				const roomNumber = 101;

				// When
				const result = hotel.bookARoom(roomNumber, startDate, endDate);

				// Then
				expect(result.isFailure).to.be.false;
				expect(hotel.getAllBookings()).to.have.deep.members([
					new Booking(102, new Date("2023-06-01"), new Date("2023-06-05")),
					new Booking(roomNumber, startDate, endDate),
				]);
			});
		});

		context("and the room is booked for a given period", () => {
			it("does not book the room", () => {
				// Given
				const roomNumber = 102;

				// When
				const result = hotel.bookARoom(roomNumber, startDate, endDate);

				// Then
				expect(result.isFailure).to.be.true;
				expect(result.value).to.eql(new Error("It seems the room you wanted to book is not available for this period"));
				expect(hotel.getAllBookings()).to.have.deep.members([
					new Booking(102, new Date("2023-06-01"), new Date("2023-06-05")),
				]);
			});
		});
	});
});
