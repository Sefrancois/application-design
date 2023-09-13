import { expect } from "@sefr/test";
import { BookARoom } from "@clean-architecture/usecase/book-a-room/book-a-room.usecase";
import { Booking } from "@clean-architecture/domain/entities/booking";
import { HotelDatasource } from "@clean-architecture/usecase/hotel.datasource";
import { FakeHotelInMemoryDatasource } from "@clean-architecture/fake/fake-hotel-in-memory.datasource";

let startDate: Date;
let endDate: Date;
let hotelDatasource: HotelDatasource;
let bookARoom: BookARoom;

describe("Clean Architecture | BookARoomTest", () => {
	beforeEach(() => {
		// Given
		startDate = new Date("2023-06-01");
		endDate = new Date("2023-06-08");
		hotelDatasource = new FakeHotelInMemoryDatasource();
		bookARoom = new BookARoom(hotelDatasource);
	});

	context("when someone book a room", () => {
		context("and the room is free for a given period", () => {
			it("book the room for a period", () => {
				// Given
				const roomNumber = 101;

				// When
				const result = bookARoom.run(roomNumber, startDate, endDate);

				// Then
				expect(result.isFailure).to.be.false;
				expect(hotelDatasource.getHotel().getAllBookings()).to.have.deep.members([
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
				const result = bookARoom.run(roomNumber, startDate, endDate);

				// Then
				expect(result.isFailure).to.be.true;
				expect(result.value).to.eql(new Error("It seems the room you wanted to book is not available for this period"));
				expect(hotelDatasource.getHotel().getAllBookings()).to.have.deep.members([
					new Booking(102, new Date("2023-06-01"), new Date("2023-06-05")),
				]);
			});
		});
	});
});
