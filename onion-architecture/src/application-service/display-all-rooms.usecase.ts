import { HotelDatasource } from "@onion-architecture/domain/service/hotel.datasource";
import { Usecase } from "@onion-architecture/application-service/usecase";
import { Room } from "@onion-architecture/domain/model/room";

export class DisplayAllRooms implements Usecase<Array<Room>> {
	private readonly hotelDatasource: HotelDatasource;

	constructor(hotelDatasource: HotelDatasource) {
		this.hotelDatasource = hotelDatasource;
	}

	public run(): Array<Room> {
		const hotel = this.hotelDatasource.getHotel();
		return hotel.getAllRooms();
	}
}
