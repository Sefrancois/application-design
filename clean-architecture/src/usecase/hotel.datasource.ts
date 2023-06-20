import { Hotel } from "@clean-architecture/entities/hotel";

export interface HotelDatasource {
	getHotel(): Hotel;
	addABooking(hotel: Hotel): void;
}
