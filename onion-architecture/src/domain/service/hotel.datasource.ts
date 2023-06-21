import { Hotel } from "@onion-architecture/domain/model/hotel";

export interface HotelDatasource {
	getHotel(): Hotel;
	addABooking(hotel: Hotel): void;
}
