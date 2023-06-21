export class BookingModel {
	constructor(roomNumber: number, startDate: Date, endDate: Date) {
		this.roomNumber = roomNumber;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	public readonly roomNumber: number;
	public readonly startDate: Date;
	public readonly endDate: Date;
}
