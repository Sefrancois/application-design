import { Event } from "@cqrs/write/domain/model/event";

type RoomBookedContent = {
	roomNumber: number;
	startDate: Date;
	endDate: Date;
}

export class RoomBookedEvent extends Event<RoomBookedContent> {
	constructor(firedAt: Date, content: RoomBookedContent) {
		super(firedAt, content);
	}
}
