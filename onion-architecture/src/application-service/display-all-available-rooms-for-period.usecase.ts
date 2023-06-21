import { HotelDatasource } from "@onion-architecture/domain/service/hotel.datasource";
import { Usecase } from "@onion-architecture/application-service/usecase";
import { Room } from "@onion-architecture/domain/model/room";

export class DisplayAllAvailableRoomsForPeriod implements Usecase<Array<Room>> {
	private readonly hotelDatasource: HotelDatasource;

	constructor(hotelDatasource: HotelDatasource) {
		this.hotelDatasource = hotelDatasource;
	}

	public run(startDate: Date, endDate: Date): Array<Room> {
		const hotel = this.hotelDatasource.getHotel();
		return hotel.getAllAvailableRoomsForPeriod(startDate, endDate);
	}
}
