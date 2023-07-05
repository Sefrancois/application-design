export class RoomModel {
	public readonly number: number;
	public readonly floor: number;
	public readonly capacity: number;
	public readonly description: string;

	constructor(number: number, floor: number, capacity: number, description: string) {
		this.number = number;
		this.floor = floor;
		this.capacity = capacity;
		this.description = description;
	}
}
