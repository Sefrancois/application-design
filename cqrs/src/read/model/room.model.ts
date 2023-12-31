export class RoomModel {
	public readonly number: number;
	public readonly capacity: number;
	public readonly description: string;

	constructor(number: number, capacity: number, description: string) {
		this.number = number;
		this.capacity = capacity;
		this.description = description;
	}
}
