import { EventListener } from "@cqrs/write/infrastructure/event/event-listener";
import { Event } from "@cqrs/write/domain/model/event";
import { RoomBookedEvent } from "@cqrs/write/domain/model/room-booked.event";
import { HotelInMemoryDao } from "@cqrs/read/dao/hotel-in-memory.dao";
import { BookingModel } from "@cqrs/read/model/booking.model";

export class ProjectBookingEventListener implements EventListener {
	private readonly hotelDao: HotelInMemoryDao;

	constructor(hotelDao: HotelInMemoryDao) {
		this.hotelDao = hotelDao;
	}

	public listen(event: Event<unknown>): void {
		if (event instanceof RoomBookedEvent) {
			this.hotelDao.update(new BookingModel(event.content.roomNumber, event.content.startDate, event.content.endDate));
		}
	}
}
