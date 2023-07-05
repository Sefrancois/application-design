import { Command } from "@cqrs/write/application-service";

export class BookARoomCommand extends Command<any> {
	public readonly roomNumber: number;
	public readonly startDate: Date;
	public readonly endDate: Date;

	constructor(roomNumber: number, startDate: Date, endDate: Date) {
		super();
		this.roomNumber = roomNumber;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
