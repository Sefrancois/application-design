import { Hotel } from "@cqrs/write/domain/model/hotel";

export interface HotelDatasource {
	getHotel(): Hotel;
	addABooking(hotel: Hotel): void;
}
