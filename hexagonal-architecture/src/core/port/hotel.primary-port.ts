export interface HotelPrimaryPort {
	getAllHotelRooms(...args: Array<unknown>): void;
	getAllAvailableHotelRoomsForPeriod(...args: Array<unknown>): void;
	postBookARoom(...args: Array<unknown>): void;
}
