import { Hotel } from "@hexagonal-architecture/core/hotel";

export interface HotelSecondaryPort {
	getHotel(): Hotel;
	addABooking(hotel: Hotel): void;
}
