import { Hotel } from "@clean-architecture/domain/entities/hotel";

export interface HotelDatasource {
	getHotel(): Hotel;
	addABooking(hotel: Hotel): void;
}
