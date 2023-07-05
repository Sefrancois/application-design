import { HotelDatasource } from "@cqrs/write/domain/service/hotel.datasource";
import { CommandHandler } from "@cqrs/write/application-service";
import { BookARoomCommand } from "@cqrs/write/application-service/book-a-room/book-a-room.command";
import { RoomBookedEvent } from "@cqrs/write/domain/model/room-booked.event";
import { Result } from "@sefr/result";

export class BookARoomCommandHandler implements CommandHandler<BookARoomCommand>{
	private readonly hotelDatasource: HotelDatasource;

	constructor(hotelDatasource: HotelDatasource) {
		this.hotelDatasource = hotelDatasource;
	}

	public handle(command: BookARoomCommand): Result<RoomBookedEvent | Error> {
		const hotel = this.hotelDatasource.getHotel();
		const result = hotel.bookARoom(command.roomNumber, command.startDate, command.endDate);
		if (!result.isFailure) {
			this.hotelDatasource.addABooking(hotel);
		}
		return result;
	}
}
