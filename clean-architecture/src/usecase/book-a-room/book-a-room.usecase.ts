import { Usecase } from "@clean-architecture/usecase/usecase";
import { Result } from "@sefr/result";
import { HotelDatasource } from "@clean-architecture/usecase/hotel.datasource";

export class BookARoom implements Usecase<Result<void>>{
	private readonly hotelDatasource: HotelDatasource;

	constructor(hotelDatasource: HotelDatasource) {
		this.hotelDatasource = hotelDatasource;
	}

	public run(roomNumber: number, startDate: Date, endDate: Date): Result<void> {
		const hotel = this.hotelDatasource.getHotel();
		const result = hotel.bookARoom(roomNumber, startDate, endDate);
		if (!result.isFailure) {
			this.hotelDatasource.addABooking(hotel);
		}
		return result;
	}
}
